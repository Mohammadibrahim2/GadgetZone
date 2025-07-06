<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{

    public function index()
    {
        $users = User::select('name', 'id', 'email')->get();
        return Inertia::render('Customer/Index', ['customers' => $users]);
    }
}
