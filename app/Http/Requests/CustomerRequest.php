<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(Request $request): array
    {
        $user = User::find($request->user_id);
        return [

            'name' => 'required|max:100',
            'password' => 'unique|required',
            'phone' => 'required',
            'postal_code' => 'required',
            'address' => 'required',
            'city' => 'required',
            'email' => 'required|unique',
            Rule::unique('user', 'email')->ignore($user), //ignore validation when update 
            'country' => 'nullable',
            'customer_code' => 'nullable',
            'status' => 'required'
        ];
    }
}
