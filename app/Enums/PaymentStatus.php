<?php

namespace App\Enums;

enum PaymentStatus: String
{
    case PAID = 'paid';
    case UNPAID = 'unpaid';

    public static function values(): array
    {
        return array_map(fn($case) => $case->value, self::cases());
    }
}
