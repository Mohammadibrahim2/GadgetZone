<?php

namespace App\Http\Controllers;

use App\Http\Requests\BrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $getBrandsData = Brand::select('id', 'name', 'logo', 'status', 'created_at')->get();
        return Inertia::render('Brands/Index', ['brands' => BrandResource::collection($getBrandsData)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Brands/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BrandRequest $request)
    {

        try {
            $validatedData = $request->validated();

            if ($request->hasFile('logo')) {
                $logo = $request->file('logo');

                // ✅ Fix: Dot (.) দিয়ে extension আগেই যুক্ত করতে হবে
                $fileName = Str::random(10) . '.' . $logo->getClientOriginalExtension();

                // ✅ putFileAs(folder, file, filename)
                $path = Storage::disk('public')->putFileAs('logos', $logo, $fileName);

                // ✅ Ensure path saved in DB
                $validatedData['logo'] = $path;
            }

            // ✅ status ফিল্ড না থাকলে 'draft' assign করা
            $validatedData['status'] = $validatedData['status'] ?? 'draft';

            $brand = Brand::create($validatedData);

            if ($brand) {
                return redirect()->route('brands.index')->with('success', 'Brand created successfully.');
            }
        } catch (\Exception $e) {
            Log::error(['error' => 'failed to store data']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $brand = Brand::findOrFail($id)->select('id', 'name', 'logo', 'status', 'created_at')->first();
        return Inertia::render('Brands/Form')->with(['brand' => new BrandResource($brand)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BrandRequest $request)
    {
        $getBrandData = Brand::findOrFail($request->id);
        try {
            $validatedData = $request->validated();

            if ($request->hasFile('logo')) {
                $logo = $request->file('logo');

                // ✅ Fix: Dot (.) দিয়ে extension আগেই যুক্ত করতে হবে
                $fileName = Str::random(10) . '.' . $logo->getClientOriginalExtension();

                // ✅ putFileAs(folder, file, filename)
                $path = Storage::disk('public')->putFileAs('logos', $logo, $fileName);

                // ✅ Ensure path saved in DB
                $validatedData['logo'] = $path;
            }

            // ✅ status ফিল্ড না থাকলে 'draft' assign করা
            $validatedData['status'] = $validatedData['status'] ?? 'draft';

            $brand = $getBrandData->update($validatedData);

            if ($brand) {
                return redirect()->route('brands.index')->with('success', 'Brand created successfully.');
            }
        } catch (\Exception $e) {
            Log::error(['error' => 'failed to store data']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        //
    }
}
