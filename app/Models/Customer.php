<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Permission\Traits\HasRoles;

class Customer extends Model
{
    use HasFactory, HasRoles;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'user_id',
        'name',
        'phone',
        'zip_code',
        'address',
        'district',
        'city',
        'area',
        'customer_code',
        'status'

    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
