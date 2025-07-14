<?php

namespace Database\Seeders;

use App\Http\Services\RolePErmission\RolePermissionService;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        /**
         * ✅ STEP 1: Get all role-permission mapping
         * উদাহরণ:
         * [
         *   'admin' => [
         *       'products' => ['create_products', 'view_products'],
         *       'categories' => ['create_categories', 'view_categories'],
         *   ]
         * ]
         */
        $rolesPermissions = RolePermissionService::$permissionByRole;

        /**
         * ✅ STEP 2: Collect all unique permissions
         * flatMap দিয়ে nested modules থেকে সব permission বের করে ফেলি
         * তারপর unique() দিয়ে duplicate গুলো বাদ দেই
         */
        $allPermissions = collect($rolesPermissions)->flatMap(function ($modules) {
            return collect($modules)->flatten(); // all permissions under each module
        })->unique(); // remove duplicates

        /**
         * ✅ STEP 3: Create all permissions (if not exist)
         * Permission::firstOrCreate = না থাকলে তৈরি করবে, থাকলে আগেরটাই রাখবে
         */
        foreach ($allPermissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        /**
         * ✅ STEP 4: Create each role and assign its permissions
         */
        // rolepemisison as key => value=== key==admin/editor/visitor..means roles
        foreach ($rolesPermissions as $roleName => $modules) {
            // 🔹 Role তৈরি করি বা আগেরটা খুঁজে বের করি
            $role = Role::firstOrCreate(['name' => $roleName]);

            // 🔹 সব module-এর ভিতরের permission একসাথে নিয়ে আসি
            $permissions = collect($modules)->flatten()->toArray();

            // 🔹 Role-এ permission গুলো assign করি (আগের permission replace করে)
            $role->syncPermissions($permissions);
        }
    }
}



///understanding  what happens

//1.$rolesPermissions Structure (Role => Permissions)
// $rolesPermissions = [
//     'super_admin' => [
//         'products' => [
//             'create_products',
//             'view_products',
//             'edit_products',
//             'delete_products',
//             'update_products'
//         ],
//         'categories' => [
//             'create_categories',
//             'view_categories',
//             'edit_categories',
//             'delete_categories',
//             'update_categories'
//         ],
//     ],
//     'admin' => [
//         'products' => [
//             'create_products',
//             'view_products',
//             'edit_products',
//             'update_products'
//         ],
//         'categories' => [
//             'create_categories',
//             'view_categories',
//             'edit_categories',
//             'update_categories'
//         ],
//     ]
// ];

//2.Step 1: FlatMap Example – সব permission বের করা
// $allPermissions = collect([
//     'create_products',
//     'view_products',
//     'edit_products',
//     'delete_products',
//     'update_products',
//     'create_categories',
//     'view_categories',
//     'edit_categories',
//     'delete_categories',
//     'update_categories',
//     // repeat হয়ে থাকলে unique করে দিচ্ছে
// ]);


//1st loop 1st Loop

// $roleName = 'super_admin';

// $modules = [
//     'products' => ['create_products', 'view_products', ...],
//     'categories' => ['create_categories', 'view_categories', ...],
// ];

// $permissions = ['create_products', 'view_products', ..., 'create_categories', 'view_categories', ...];

// $role = Role::firstOrCreate(['name' => 'super_admin']);
// $role->syncPermissions($permissions);

//2nd Loop

// $roleName = 'admin';

// $modules = [
//     'products' => ['create_products', 'view_products', ...],
//     'categories' => ['create_categories', 'view_categories', ...],
// ];

// $permissions = ['create_products', 'view_products', ..., 'create_categories', 'view_categories', ...];

// $role = Role::firstOrCreate(['name' => 'admin']);
// $role->syncPermissions($permissions);



//understaning collect()


//example:
// $data = [
//     'admin' => [
//         'products' => ['create', 'edit'],
//         'users' => ['view', 'ban']
//     ],
//     'editor' => [
//         'products' => ['view'],
//         'users' => ['view']
//     ]
// ];

// $collection = collect($data);

// // শুধু 'admin' এর permission বের করতে:
// $adminPermissions = collect($data['admin'])->flatten();
// // ['create', 'edit', 'view', 'ban']

// // সব permissions:
// $allPermissions = collect($data)->flatMap(function ($modules) {
//     return collect($modules)->flatten();
// })->unique();

// Output:
// ['create', 'edit', 'view', 'ban']
