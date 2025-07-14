<?php

namespace App\Http\Controllers;

use App\Http\Requests\ColorRequest;
use App\Models\Color;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ColorController extends Controller
{
    public function index()
    {
        $colors = Color::select('name', 'hex_code', 'status', 'id')->get();
        return Inertia::render('Color/Index', ['colors' => $colors]);
    }

    public function create()
    {
        return Inertia::render('Color/Form');
    }

    public function store(ColorRequest $request)
    {
        try {
            Color::create($request->validated());
            return redirect()->route('colors.index')->with('success', 'Color created successfully');
        } catch (\Exception $e) {
            Log::error('Color creation failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to create color')->withInput();
        }
    }

    public function edit($id)
    {
        $color = Color::select('id', 'name', 'hex_code', 'status')->findOrFail($id);
        return Inertia::render('Color/Form', ['color' => $color]);
    }

    public function update(ColorRequest $request, $id)
    {

        try {
            $color = Color::findOrFail($id);
            $color->update($request->validated());
            return redirect()->route('colors.index')->with('success', 'Color updated successfully');
        } catch (\Exception $e) {
            Log::error('Color update failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to update color')->withInput();
        }
    }

    public function destroy($id)
    {
        try {
            $color = Color::findOrFail($id);

            $color->delete();
            return redirect()->route('colors.index')->with('success', 'Color deleted successfully');
        } catch (\Exception $e) {
            Log::error('Color deletion failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to delete color');
        }
    }
}
