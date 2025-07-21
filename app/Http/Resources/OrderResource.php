<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'payment_method' => ucwords($this->payment_method),
            'payment_status' => $this->payment_status,
            'total_amount' => $this->total_amount,
            'discount' => $this->discount,
            'shipping_cost' => $this->shipping_cost,
            'note' => $this->note,
            'order_status' => $this->order_status,
            'customers' => new CustomerResource($this->whenLoaded('customer')),
            'created_at' => date('d M Y', strtotime($this->created_at)),
            'orders_tracking_info' => new OrderTrackingInfoResource($this->whenLoaded('tracking'))
        ];
    }
}
//    "id" => 3
//         "user_id" => null
//         "customer_id" => 4
//         "payment_method" => "cash"
//         "transaction_id" => null
//         "payment_status" => "unpaid"
//         "order_status" => "pending"
//         "total_amount" => "762.00"
//         "discount" => "0.00"
//         "shipping_cost" => "50.00"
//         "note" => null
//         "deleted_at" => null
//         "created_at" => "2025-07-17 14:02:57"
//         "updated_at" => "2025-07-17 14:02:57"
//       ]