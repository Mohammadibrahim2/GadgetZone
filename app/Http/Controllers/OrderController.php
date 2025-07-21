<?php

namespace App\Http\Controllers;

use App\Enums\CustomerEnum;
use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Events\OrderPlaced;
use App\Http\Resources\OrderResource;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderTracking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with('customer:id,name,email,phone')->get();

        return Inertia::render('Order/Index', ['orders' => OrderResource::collection($orders)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        DB::beginTransaction();
        try {
            $data = $request->only([
                'name',
                'email',
                'phone',
                'address',
                'city',
                'district',
                'area',
                'zipCode',
                'payment_method',
                'transaction_id',
                'nnoteame',
            ]);
            $cart = $request->input('cart');

            // if (auth()->check()) {
            //     $user = auth()->user();

            //     $customer = $user->customer ?? Customer::create([
            //         'user_id' => $user->id,
            //         'name' => $data['name'],
            //         'email' => $data['email'],
            //         'phone' => $data['phone'],
            //         'address' => $data['address'],
            //         'city' => $data['city'],
            //         'district' => $data['district'],
            //         'zip_code' => $data['zipCode'],
            //         'status' => CustomerEnum::INACTIVE->value,
            //     ]);

            //     $userId = $user->id;
            // } else {


            $customer = Customer::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'address' => $data['address'],
                'city' => $data['city'],
                'district' => $data['district'],
                'zip_code' => $data['zipCode'],
                'status' => CustomerEnum::INACTIVE->value,
            ]);
            $userId = null;
            // }

            $subTotal = collect($cart)->sum(fn($item) => $item['price'] * $item['quantity']);
            $shipping = 50;
            $discount = 0;
            $total = $subTotal + $shipping - $discount;
            $order = Order::create([
                'user_id' => $userId,
                'customer_id' => $customer->id,
                'payment_method' => $data['payment_method'],
                'transaction_id' => $data['transaction_id'] ?? null,
                'payment_status' => PaymentStatus::UNPAID->value,
                'order_status' => OrderStatus::PENDING->value,
                'total_amount' => $total,
                'shipping_cost' => $shipping,
                'discount' => $discount,
                'note' => $data['nnoteame'] ?? null,
            ]);
            // 4. Insert Order Items
            foreach ($cart as $item) {
                $order->items()->create([
                    'product_id' => $item['product_id'],
                    'variant_id' => $item['variant_id'],
                    'title' => $item['title'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'subtotal' => $item['price'] * $item['quantity'],
                    'color' => $item['color'] ?? null,
                    'image' => $item['image'] ?? null,
                ]);
            }

            //for tracking order

            do {
                $trackingCode = 'ORD-' . mt_rand(1000000000, 9999999999);
            } while (OrderTracking::where('order_tracking_code', $trackingCode)->exists());
            OrderTracking::create([
                'order_tracking_code' => $trackingCode,
                'order_id' => $order->id,
                'email' => $customer->email,
                'phone' => $customer->phone ?? null
            ]);

            $trackingInfo = [
                'orderId' => $order->id,
                'code' => $trackingCode,
                'email' => $customer->email,
                'phone' => $customer->phone ?? null,
            ];
            event(new OrderPlaced($order));
            DB::commit();

            return response()->json([
                'trackingInfo' => $trackingInfo,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to place order',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($orderId)
    {
        $order = Order::findOrFail($orderId);
        $order->delete();
        return redirect()->route('orders.index');
    }

    public function viewOrder($orderId)
    {

        $order = Order::with(['customer:id,name,email,phone', 'tracking:order_tracking_code,id,order_id'])->findOrFail($orderId);

        return Inertia::render('Order/CompletedOrders/ViewOrder', ['order' => new OrderResource($order)]);
    }

    public function myOrder($orderId)
    {
        $order = Order::with([
            'customer:id,name,email,phone',
            'items:id,title,image',
        ])->findOrFail($orderId);
        return $order;
        // return Inertia::render('Order/CompletedOrders/ViewOrder', ['order' => new OrderResource($order)]);
    }
}
