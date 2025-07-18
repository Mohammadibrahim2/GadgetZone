<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,
            'title' => ucwords($this->title),
            'slug' => $this->slug,
            'description' => $this->description,
            'sku' => $this->sku,
            'status' => $this->status,
            'featured_image' => asset('storage/' . $this->featured_image),
            'created_at' => date('d M Y', strtotime($this->created_at)),
            'brand' => new BrandResource($this->whenLoaded('brand')),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'attributes' => AttributeResource::collection($this->whenLoaded('attributes')),
            'variants' => VariantResource::collection($this->whenLoaded('variants')),




        ];
    }
}
