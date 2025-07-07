<?php

namespace App\Http\Services;

use App\CustomerEnum;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class CustomerService
{


    public function updateOrCraete(Request $request)
    {
        DB::transaction(function () use ($request) {

            $user = User::updateOrCreate([
                'id' => $request->user_id
            ], [
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'name' => $request->name
            ]);

            $customer = Customer::updateOrCreate([
                'id' => $request->id,
                'user_id' => $user->id
            ], [

                'phone' => $request->phone,
                'postal_code' => $request->postal_code,
                'address' => $request->address,
                'city' => $request->city,
                'status' => CustomerEnum::INACTIVE->value,
                'country' => $request->country,
                'customer_code' => 'CU' . Str::random(3)

            ]);
            return $customer;
        });
    }
}
