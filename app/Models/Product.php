<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;


    protected $fillable = [
        'title',
        'slug',
        'description',
        'status',
        'sku',
        'category_id',
        'brand_id',
        'featured_image'
    ];

    public function categories()
    {
        return $this->belongsTo(Category::class);
    }
    public function brands()
    {
        return $this->belongsTo(Brand::class);
    }

    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'attribute_product')
            ->withPivot('attribute_value_id'); //means attribute->attribute_value=red/200gb extra column 
    }

    public function variants()
    {
        return $this->hasMany(Variant::class); //each product has different variant
    }
}
