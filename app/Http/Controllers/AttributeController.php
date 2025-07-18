<?php

namespace App\Http\Controllers;

use App\Enums\GlobalEnums;
use App\Http\Requests\AttributeRequest;
use App\Http\Resources\AttributeResource;
use App\Models\Attribute;
use App\Models\AttributeValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

use function PHPUnit\Framework\isArray;

class AttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $attributes = Attribute::with('values:id,value,attribute_id')
            ->select('id', 'name', 'slug', 'status', 'created_at')
            ->get();;
        return Inertia::render('Attributes/Index', ['attributes' => AttributeResource::collection($attributes)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Attributes/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AttributeRequest $request)
    {
        try {

            DB::beginTransaction();
            $attribute = Attribute::create([
                'name' => $request->validated('name'),
                'slug' => $request->validated('slug'),
                'status' => $request->validated('status') ? $request->validated('status') : GlobalEnums::DARFT->value
            ]);
            foreach ($request->validated('values') as $value) {
                AttributeValue::create(['value' => $value, 'attribute_id' => $attribute->id]);
            }

            DB::commit();

            if ($attribute) {
                return redirect()->route('attributes.index');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error(['error' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Attribute $attribute)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        try {
            $attribute = Attribute::with('values:id,value,attribute_id')
                ->select('id', 'name', 'slug', 'status', 'created_at')
                ->findOrFail($id);
            return Inertia::render('Attributes/Form', ['attribute' => new AttributeResource($attribute)]);
        } catch (\Exception $e) {
            Log::error(['error' => $e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AttributeRequest $request, $id)
    {

        $attribute = Attribute::findOrFail($id);
        $attribute->update([
            'name'   => $request->validated('name'),
            'slug'   => $request->validated('slug'),
            'status' => $request->validated('status') ?? GlobalEnums::DARFT->value,
        ]);


        // 2️⃣ Purge old values (or use smarter diff logic)
        $attribute->values()->delete();
        //re-insert values
        foreach ($request->validated('values') as $value) {
            // AttributeValue::create(['value' => $value,'attribute_id'=>$attribute->id]);// old version
            $attribute->values()->create(['value' => $value]); //new version atomatically add attribute_id
        }


        if ($attribute) {
            return redirect()->route('attributes.index')
                ->with('success', 'Attribute updated successfully');
        }
        // } catch (\Exception $e) {
        // Log::error('Attribute update failed: ' . $e->getMessage());

        // return back()->with('error', 'An error occurred while updating the attribute')
        //     ->withInput();
        // }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attribute $attribute)
    {
        //
    }
}
