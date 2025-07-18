<?php

use App\Enums\CustomerEnum;
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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();

            $table->string('name')->nullable();
            $table->string('email');
            $table->string('phone');

            // Address info
            $table->string('address');
            $table->string('city');
            $table->string('district');
            $table->string('area')->nullable();
            $table->string('zip_code');

            // Status enum (active, inactive)
            $table->string('status')->default(CustomerEnum::INACTIVE->value);
            $table->foreignId('user_id')
                ->nullable()
                ->constrained('users')
                ->onDelete('cascade');

            $table->softDeletes();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
