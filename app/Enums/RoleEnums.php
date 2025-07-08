<?php

namespace App\Enums;

enum RoleEnums: String
{
    case SUPER_ADMIN = 'super_admin';
    case AMDMIN = 'admin';
    case CUSTOMER = 'customer';
}
