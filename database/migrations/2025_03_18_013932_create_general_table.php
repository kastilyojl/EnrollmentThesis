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
        Schema::create('academic_year', function (Blueprint $table) {
            $table->id();
            $table->date('start');
            $table->date('end');
            $table->string('status', 50);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('users_id_format', function (Blueprint $table) {
            $table->id();
            $table->string('user_type', 50);
            $table->string('id_format', 255);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('faq', function (Blueprint $table) {
            $table->id();
            $table->string('question', 255)->nullable();
            $table->longText('answer')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_year');
        Schema::dropIfExists('users_id_format');
    }
};
