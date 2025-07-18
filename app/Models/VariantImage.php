<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariantImage extends Model
{
    use HasFactory;
    protected $table = 'variant_images';

    protected $fillable = ['variant_id', 'image_path'];

    public function variant()
    {
        return $this->belongsTo(Variant::class, 'variant_id');
    }
}
