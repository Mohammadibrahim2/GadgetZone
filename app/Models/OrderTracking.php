<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderTracking extends Model
{
    protected $table = 'order_trackings';
    protected $fillable = [
        'order_id',
        'order_tracking_code',
        'email',
        'phone'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
