<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VariantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id'         => $this->id,
            'product_id' => $this->product_id,
            'color_id'   => $this->color_id,
            'price'      => $this->price,
            'stock'      => $this->stock,
            'images' => VariantImageResource::collection($this->whenLoaded('images')),
            'attribute_values' => AttributeResource::collection($this->whenLoaded('attributeValues')),
            'color' => new ColorResource($this->whenLoaded('color')),
        ];
    }
}
