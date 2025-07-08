<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function __construct(User $user) {}

    public function loginView()
    {
        return Inertia::render('Auth/Login');
    }
    public function registerView()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        Auth::login($user);
        return redirect()->route('dashboard');
    }


    public function login(Request $request)
    {
        // dd($request->all());
        // $credentials = $request->validate([
        //     'eamil' => 'unique|email',
        //     'password' => 'required'
        // ]);
        if (Auth::attempt($request->only('email', 'password'))) {
            $request->session()->regenerateToken();
            return to_route('dashboard');
            // return  redirect()->intended('dashboard');
        }
        return back()->with(['error' => 'Invalid credentials']);
    }
    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
    public function profile($id)
    {
        try {
            $user = USer::findOrFail($id);
            return redirect()->route('profile');
        } catch (\Exception $e) {
            Log::error(['error' => $e->getMessage()]);
        }
    }
}
