<?php

namespace App\Models;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'customer_id',
        'payment_method',
        'transaction_id',
        'payment_status',
        'order_status',
        'total_amount',
        'discount',
        'shipping_cost',
        'note'
    ];

    protected $casts = [
        'payment_status' => PaymentStatus::class,
        'order_status' => OrderStatus::class,
        'total_amount' => 'decimal:2',
        'discount' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }
    public function tracking()
    {
        return $this->hasOne(OrderTracking::class, 'order_id');
    }
}
