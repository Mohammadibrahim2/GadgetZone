<?php

namespace App\Providers;

use App\Events\OrderPlaced;
use App\Listeners\SendOrderConfirmationMail;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    //

    protected $listener = [
        OrderPlaced::class => SendOrderConfirmationMail::class
    ];
    /**
     * Bootstrap services.
     */
    public function boot(): void {}
}
