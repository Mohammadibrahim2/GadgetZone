<?php

namespace App\Listeners;

use App\Events\AdminOrderFromMerchantevent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class AdminOrderPlacedFromMerchant
{
    /**
     * Create the event listener.
     */
    public function __construct(protected AdminOrderFromMerchantevent $adminOrderevent) {}

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {


        // Mail::to('print.manzil@mail.com')->queue(new )
    }
}
