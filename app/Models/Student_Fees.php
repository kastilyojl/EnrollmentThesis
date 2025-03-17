<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student_Fees extends Model
{
    //
    use SoftDeletes;
    protected $table = 'student_fees';
    protected $fillable = [
        'student_info_id',
        'payment_details_id',
        'status',
        'amount_paid',
    ];
}
