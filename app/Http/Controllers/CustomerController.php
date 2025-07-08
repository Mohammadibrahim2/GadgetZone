<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Http\Services\CustomerService;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function __construct(protected CustomerService $customerService) {}
    public function index()
    {
        $customers = Customer::with('user:id,user_id,name,email')
            ->select('id', 'country', 'phone', 'created_at', 'status', 'customer_code')->get();


        return Inertia::render('Customer/Index', ['customers' => CustomerResource::collection($customers)]);
    }

    public function create()
    {

        return Inertia::render('Customer/Form');
    }
    public function store(CustomerRequest $request)
    {
        try {
            $customer = $this->customerService->updateOrCraete($request);

            if ($customer) {
                return redirect()->route('customers.customers');
            }
        } catch (\Exception $e) {
            Log::error(['error' => $e->getMessage()]);
        }
    }
    public function edit($id)
    {
        try {
            $customer = Customer::select('title', 'id', 'slug', 'description', 'created_at', 'status')->findOrfail($id);
            return Inertia::render('Customer/Form', ['customer' => new CustomerResource($customer)]);
        } catch (\Exception $e) {
            Log::error(['error' => $e->getMessage()]);
        }
    }

    public function update(CustomerRequest $request, $id)
    {
        try {
            $category = Customer::findOrFail($id);
            $updatedData = $category->update([
                'title' => $request->validated('title'),
                'description' => $request->validated('description'),
                'slug' => Str::slug($request->validated('title')),
                'status' => $request->validated('status') ? $request->validated('status') : CategoryEnums::DARFT->value
            ]);

            if ($updatedData) {
                return redirect()->route('categories.categories');
            }
        } catch (\Exception $e) {
            Log::error(['error' => $e->getMessage()]);
        }
    }


    public function destroy($id)
    {
        try {
            $category = Customer::findOrfail($id);
            $deletedData = $category->delete();
            if ($deletedData) {
                return redirect()->route('categories.categories');
            }
        } catch (\Exception $e) {
            Log::error(['error' => $e->getMessage()]);
        }
    }
}
