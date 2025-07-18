<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $fillable = [
        'name',
        'hex_code',
        'status'
    ];

    public function variants()
    {
        return $this->hasMany(Variant::class);
    }
}
