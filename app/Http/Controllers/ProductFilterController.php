<?php

namespace App\Http\Controllers;

use App\Enums\GlobalEnums;
use App\Http\Resources\ProductResource;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use Attribute;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductFilterController extends Controller
{
    public function search(Request $request)
    {

        $search = $request->query('keyword');
        $products = Product::where('title', 'LIKE', '%' . $search . '%')->with(['attributes.values', 'variants.images', 'variants.attributeValues'])->get();
        return Inertia::render('FilterAndSearchProduct/SearchResults', [
            'products' => ProductResource::collection($products),
            'count' => $products->count(),
            'isMobile' => false,
        ]);
    }

    public function getProducts(Request $request)
    {
        $priceRange = $request->query('priceRange');
        $selectedCategories = (array) $request->query('selectedCategories', []);
        $selectedColors = (array) $request->query('selectedColors', []);

        $categories = Category::select('id', 'title')
            ->where('status', GlobalEnums::PUBLISHED->value)
            ->get();

        $brands = Brand::select('id', 'name')
            ->where('status', GlobalEnums::PUBLISHED->value)
            ->get();

        $colors = Color::select('id', 'name', 'hex_code')
            ->where('status', GlobalEnums::PUBLISHED->value)
            ->get();

        $products = Product::when(!empty($selectedCategories), function ($query) use ($selectedCategories) {
            $query->whereHas('category', function ($q) use ($selectedCategories) {
                $q->whereIn('title', $selectedCategories);
            });
        })->with('category')->get();

        // dd($products->count()); done

        return Inertia::render('FilterAndSearchProduct/FilterProductPerent', [
            'products' => ProductResource::collection($products),
            'categories' => $categories,
            'brands' => $brands,
            'colors' => $colors
        ]);
    }
}
