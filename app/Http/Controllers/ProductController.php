<?php

namespace App\Http\Controllers;

use App\Enums\GlobalEnums;
use App\Http\Resources\ProductResource;
use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category:id,title', 'brand:id,name,logo', 'attributes.values', 'variants.images', 'variants.attributeValues', 'variants.color:id,name,hex_code')
            ->orderBy('id', 'desc')->get();
        return Inertia::render('Product/Index', ['products' => ProductResource::collection($products)]);

        //  return ProductResource::collection($products);
    }


    public function create()
    {
        $categories = Category::select('id', 'title')->where('status', GlobalEnums::PUBLISHED->value)->get();
        $brands = Brand::select('id', 'name')->where('status', GlobalEnums::PUBLISHED->value)->get();
        $attributes =  Attribute::with('values:id,value,attribute_id')
            ->select('id', 'name', 'slug', 'status', 'created_at')->where('status', GlobalEnums::PUBLISHED->value)->get();
        $colors = Color::select('id', 'name', 'hex_code')->where('status', GlobalEnums::PUBLISHED->value)->get();
        return Inertia::render('Product/Form', ['categories' => $categories, 'brands' => $brands, 'attributes' => $attributes, 'colors' => $colors]);
    }


    public function store(Request $request)
    {


        // DB::beginTransaction();

        try {

            $featuredImagePath = null;

            if ($request->hasFile('featured_image')) {
                if ($request->old_image && Storage::disk('public')->exists($request->old_image)) {
                    Storage::disk('public')->delete($request->old_image);
                }


                $file = $request->file('featured_image');
                $filename = Str::random(10) . '.' . $file->getClientOriginalExtension();

                $featuredImagePath = $file->storeAs('products/featured', $filename, 'public');
            } elseif ($request->old_image) {

                $featuredImagePath = $request->old_image;
            } else {

                $featuredImagePath = null;
            }


            $product = Product::create([
                'title'         => $request->title,
                'slug'          => $request->slug,
                'description'   => $request->description,
                'brand_id'      => $request->brand_id,
                'category_id'   => $request->category_id,
                'sku'           => $request->sku,
                'status'        => $request->status,
                'featured_image' => $featuredImagePath,
            ]);

            $rawAttributes = $request->input('attributes');
            $attributesData = json_decode($rawAttributes, true);
            $syncData = [];

            foreach ($attributesData as $attributeId => $valueIds) {
                foreach ($valueIds as $valueId) {
                    $syncData[] = [
                        'attribute_id' => $attributeId,
                        'attribute_value_id' => $valueId,
                    ];
                }
            }

            foreach ($syncData as $data) {
                $product->attributes()->attach($data['attribute_id'], [
                    'attribute_value_id' => $data['attribute_value_id'],
                ]);
            }

            foreach ($request->variants as $variantData) {
                // ✅ Variant Create
                $variant = $product->variants()->create([
                    'color_id' => $variantData['color_id'],
                    'price'    => $variantData['price'],
                    'stock'    => $variantData['stock'],
                    'product_id' => $product->id,

                ]);


                // ✅ Sync variant_attribute_pivot
                $variantSyncData = [];

                foreach ($attributesData as $attributeId => $valueIds) {
                    foreach ($valueIds as $valueId) {
                        $variantSyncData[$attributeId] = ['attribute_value_id' => $valueId];
                    }
                }


                $variant->attributeValues()->sync($variantSyncData);

                // ✅ Save Variant Images

                if (!empty($variantData['images'])) {
                    foreach ($variantData['images'] as $imageFile) {
                        if ($imageFile instanceof \Illuminate\Http\UploadedFile) {
                            $filename = Str::random(10) . '.' . $imageFile->getClientOriginalExtension();
                            $imagePath = $imageFile->storeAs('products/variants', $filename, 'public');

                            $variant->images()->create([
                                'image_path' => $imagePath,
                                'variant_id' => $variant->id
                            ]);
                        }
                    }
                }
            }

            // DB::commit();
            return redirect()->route('products.index')->with('success', 'Product created successfully!');
        } catch (\Exception $e) {
            Log::error(['error' => $e->getMessage()]);
            // DB::rollBack();
            return back()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }


    /**
     * {


     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::with('category:id,title', 'brand:id,name', 'attributes.values', 'variants.images', 'variants.attributeValues', 'variants.color:id,name,hex_code')
            ->findOrFail($id);
        //  return new ProductResource($product);
        return Inertia::render('Product/ProductPage', ['product' => new ProductResource($product)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $product = Product::with('category:id,title', 'brand:id,name', 'attributes.values', 'variants.images', 'variants.attributeValues', 'variants.color:id,name,hex_code')
            ->findOrFail($id);
        //  return $product;
        return Inertia::render('Product/Form', ['product' => new ProductResource($product)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }

    public function shopProducts()
    {
        $shopProducts = Product::with('category:id,title', 'brand:id,name,logo', 'attributes.values', 'variants.images', 'variants.attributeValues', 'variants.color:id,name,hex_code')
            ->orderBy('id', 'desc')->get();
        return Inertia::render('Product/ProductShopping/ShopingPage', ['shopProducts' => ProductResource::collection($shopProducts)]);
    }
}


// attributes
// ----------
// id | name
// ---|------
// 1  | Size
// 2  | Material

// attribute_values
// -----------------
// id | attribute_id | value
// ---|--------------|-------
// 1  | 1            | S
// 2  | 1            | M
// 3  | 2            | Cotton
// 4  | 2            | Polyester

// attribute_product (pivot table)
// -------------------------------
// product_id | attribute_id | attribute_value_id
// -----------|--------------|-------------------
// 1          | 1            | 2   (Size -> M)
// 1          | 2            | 3   (Material -> Cotton)
