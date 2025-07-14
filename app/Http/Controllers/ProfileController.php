<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit($id): Response
    {

        $user = User::findOrFail($id);
        return Inertia::render('User/Index', [
            'user' => $user,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'nullable|string|max:15',
            'password' => 'nullable|string|min:6',
            'profile_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'old_image' => 'nullable|string'
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
        ];

        // ✅ Password optional update
        if (!empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        // ✅ Profile image handling
        if ($request->hasFile('profile_image')) {
            $file = $request->file('profile_image');
            $fileName = Str::random(10) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('profile', $fileName, 'public');
            $updateData['profile_image'] = $path;

            // ✅ Delete old image if exists
            if ($validated['old_image'] && Storage::disk('public')->exists($validated['old_image'])) {
                Storage::disk('public')->delete($validated['old_image']);
            }
        } else {
            // ✅ No new file, keep old image (or null)
            $updateData['profile_image'] = $validated['old_image'] ?? null;
        }

        $user->update($updateData);

        return Redirect::to('/');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
