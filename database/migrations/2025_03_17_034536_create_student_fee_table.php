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
        Schema::create('payment_details', function (Blueprint $table) {
            $table->id();
            $table->string('student_info_id');
            $table->string('fee_type'); // College Fee, SHS Fee, Other Fee
            $table->unsignedBigInteger('fee_id'); // College Fee id, etc... 
            $table->double('amount');
            $table->foreign('student_info_id')->references('student_id')->on('student_info')->onDelete('cascade')->onUpdate('cascade');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('student_fees', function (Blueprint $table) {
            $table->id();
            $table->string('student_info_id');
            $table->unsignedBigInteger('payment_details_id'); // College Fee, SHS Fee, Other Fee
            $table->string('status'); // Paying, Fully Paid
            $table->double('amount_paid');
            $table->foreign('student_info_id')->references('student_id')->on('student_info')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('payment_details_id')->references('id')->on('payment_details')->onDelete('cascade')->onUpdate('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_details');
    }
};
