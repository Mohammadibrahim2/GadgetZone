<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Variant extends Model
{
    use HasFactory;
    protected $table = 'product_variants';

    protected $fillable = [
        'product_id',
        'color_id',
        'price',
        'stock',

    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function images()
    {
        return $this->hasMany(VariantImage::class, 'variant_id'); //each variant has 3/4 images or more
    }

    public function attributeValues()
    {
        return $this->belongsToMany(Attribute::class, 'variant_attribute_pivot', 'variant_id', 'attribute_id')->withPivot('attribute_value_id');
    }
    public function color()
    {
        return $this->belongsTo(Color::class);
    }
}
