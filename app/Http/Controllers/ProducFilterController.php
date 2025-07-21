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

class ProducFilterController extends Controller
{
    public function index()
    {


        // return Inertia::render('FilterProduct/FilterProductPerent', ['categories' => $categories, 'brands' => $brands,  'colors' => $colors]);
    }

    public function getProducts(Request $request)
    {
        //  dd($request->query());
        $priceRange = $request->query('priceRange');
        $selectedCategories = $request->query('selectedCategories');
        $selectedColors = $request->query('selectedColors');
        $search = $request->query('search');

        $categories = Category::select('id', 'title')->where('status', GlobalEnums::PUBLISHED->value)->get();
        $brands = Brand::select('id', 'name')->where('status', GlobalEnums::PUBLISHED->value)->get();
        // $attributes =  Attribute::with('values:id,value,attribute_id')
        //     ->select('id', 'name', 'slug', 'status', 'created_at')->where('status', GlobalEnums::PUBLISHED->value)->get();
        $colors = Color::select('id', 'name', 'hex_code')->where('status', GlobalEnums::PUBLISHED->value)->get();

        //   dd($search);
        $products = Product::where('title', 'LIKE', '%' . $search . '%')->get();
        return Inertia::render('FilterProduct/FilterProductPerent', [
            'products' => ProductResource::collection($products),
            'categories' => $categories,
            'brands' => $brands,
            'colors' => $colors
        ]);
    }

    public function pregnancyChecker()
    {
        return Inertia::render('PregnencyTest/Ptest');
    }
}
