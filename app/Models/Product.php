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

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
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
