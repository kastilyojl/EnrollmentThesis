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
            $table->string('type')->nullable();
            $table->text('program_name')->nullable();
            $table->text('no_unit')->nullable();
            $table->double('amount')->nullable();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('discount_title')->nullable();
            $table->double('discount_amount')->nullable();
            $table->double('total_amount')->nullable();
            $table->softDeletes();
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
