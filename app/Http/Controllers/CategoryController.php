<?php

namespace App\Http\Controllers;

use App\Enums\GlobalEnums;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::select('title', 'id', 'slug', 'description', 'created_at', 'status')->get();

        // dd($categories);
        return Inertia::render('Category/Index', ['categories' => CategoryResource::collection($categories)]);
    }

    public function create()
    {

        return Inertia::render('Category/Form');
    }
    public function store(CategoryRequest $request)
    {
        try {
            $category = Category::create([
                'title' => $request->validated('title'),
                'description' => $request->validated('description'),
                'slug' => Str::slug($request->validated('title')),
                'status' => $request->validated('status') ? $request->validated('status') : GlobalEnums::DARFT->value
            ]);
            if ($category) {
                return redirect()->route('categories.categories');
            }
        } catch (\Exception $e) {
            Log::error(['error' => $e->getMessage()]);
        }
    }
    public function edit($id)
    {
        try {
            $category = Category::select('title', 'id', 'slug', 'description', 'created_at', 'status')->findOrfail($id);
            return Inertia::render('Category/Form', ['category' => new CategoryResource($category)]);
        } catch (\Exception $e) {
            Log::error(['error' => $e->getMessage()]);
        }
    }

    public function update(CategoryRequest $request, $id)
    {
        try {
            $category = Category::findOrFail($id);
            $updatedData = $category->update([
                'title' => $request->validated('title'),
                'description' => $request->validated('description'),
                'slug' => Str::slug($request->validated('title')),
                'status' => $request->validated('status') ? $request->validated('status') : GlobalEnums::DARFT->value
            ]);

            if ($updatedData) {
                return redirect()->route('categories.categories');
            }
        } catch (\Exception $e) {
            Log::error(['error' => $e->getMessage()]);
        }
    }


    public function destroy($id)
    {
        try {
            $category = Category::findOrfail($id);
            $deletedData = $category->delete();
            if ($deletedData) {
                return redirect()->route('categories.categories');
            }
        } catch (\Exception $e) {
            Log::error(['error' => $e->getMessage()]);
        }
    }
}
