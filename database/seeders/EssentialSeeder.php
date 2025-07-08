<?php

namespace Database\Seeders;

use App\Enums\RoleEnums;
use App\Models\User;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EssentialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'ibrahim',

            'email' => 'admin@mail.com',
            'password' => Hash::make('password'),
            'phone' => '08976655656',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        if ($user) {
            $user->assignRole(RoleEnums::SUPER_ADMIN->value);
        }
    }
}
