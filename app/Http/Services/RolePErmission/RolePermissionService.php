<?php

namespace App\Http\Services\RolePErmission;

class RolePermissionService
{


    //  declare a valiable for role based permission

    public static $permissionByRole = [
        'super_admin' => [
            'products' => [
                'create_products',
                'view_products',
                'edit_products',
                'delete_products',
                'update_products'
            ],
            'categories' => [
                'create_categories',
                'view_categories',
                'edit_categories',
                'delete_categories',
                'update_categories'
            ],
            'users' => [
                'create_users',
                'view_users',
                'edit_users',
                'delete_users',
                'update_users'
            ],
            'attributes' => [
                'create_attributes',
                'view_attributes',
                'edit_attributes',
                'delete_attributes',
                'update_attributes'
            ]
        ],
        //for admin
        'admin' => [
            'products' => [
                'create_products',
                'view_products',
                'edit_products',
                'update_products'
            ],
            'categories' => [
                'create_categories',
                'view_categories',
                'edit_categories',
                'update_categories'
            ],
            'users' => [
                'view_users'
            ],
            'attributes' => [
                'create_attributes',
                'view_attributes',
                'edit_attributes',
                'update_attributes'
            ]
        ],
        //for editor
        'editor' => [
            'products' => [
                'view_products',
                'edit_products',
                'update_products'
            ],
            'categories' => [
                'view_categories',
                'edit_categories',
                'update_categories'
            ],
            'attributes' => [
                'view_attributes',
                'edit_attributes',
                'update_attributes'
            ]
        ],
        //for viewer
        'viewer' => [
            'products' => [
                'view_products'
            ],
            'categories' => [
                'view_categories'
            ],
            'attributes' => [
                'view_attributes'
            ]
        ]
    ];



    public static function getAllPermisisonGrouped(): array
    {
        return self::$permissionByRole['super_admin'];
    }
}
