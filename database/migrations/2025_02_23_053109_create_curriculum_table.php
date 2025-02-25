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
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('code',50)->index();
            $table->string('name',255);
            $table->string('status',255);
            $table->text('campus');
            $table->string('duration',50);
            $table->string('department',255);
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('program_code');
            $table->string('code', 50);
            $table->string('name', 255);
            $table->string('prerequisites', 255)->nullable();
            $table->string('period', 255);
            $table->string('department', 255);
            $table->string('year_level', 255);
            $table->string('category', 255);
            $table->integer('lec')->nullable();
            $table->integer('lab')->nullable();
            $table->integer('unit')->nullable();
            $table->integer('total')->nullable();
            $table->foreign('program_code')->references('code')->on('programs')->onDelete('cascade')->onUpdate('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
        Schema::dropIfExists('subjects');
    }
};
