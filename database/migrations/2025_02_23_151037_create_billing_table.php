<?php

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
        Schema::create('billing_type', function (Blueprint $table) {
            $table->id();
            $table->string('fee_type')->nullable();
            $table->text('program_name')->nullable();
            $table->text('no_unit')->nullable();
            $table->double('amount')->nullable();
            $table->string('misellaneous_name')->nullable();
            $table->text('misellaneous_description')->nullable();
            $table->string('discount_name')->nullable();
            $table->double('discount_amount')->nullable();
            $table->double('total_amount')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('payment_verification', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('users_id');
            $table->string('name');
            $table->string('email');
            $table->string('purpose');
            $table->string('semester');
            $table->string('reference');
            $table->double('amount');
            $table->string('payment_receipt');
            $table->string('year_level');
            $table->string('program');
            $table->string('status', 50)->default('pending');

            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billing_type');
    }
};
