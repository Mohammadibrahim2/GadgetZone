<?php

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete(null);
            $table->foreignId('customer_id')->nullable()->constrained('customers')->onDelete('cascade');

            $table->string('payment_method');
            $table->string('transaction_id')->nullable();

            $table->enum('payment_status', PaymentStatus::values())->default(PaymentStatus::UNPAID->value);
            $table->enum('order_status', OrderStatus::values())->default(OrderStatus::PENDING->value);

            $table->decimal('total_amount', 12, 2);
            $table->decimal('discount', 12, 2)->default(0);
            $table->decimal('shipping_cost', 12, 2)->default(0);

            $table->text('note')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**              
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
