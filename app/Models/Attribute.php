<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{

    protected $fillable = [
        'name',
        'slug',
        'status',
    ];

    public function values()
    {
        return $this->hasMany(AttributeValue::class);
    }
    public function products()
    {
        return $this->belongsToMany(Product::class, 'attribute_product')
            ->withPivot('attribute_value_id')
            ->withTimestamps();
    }
}
