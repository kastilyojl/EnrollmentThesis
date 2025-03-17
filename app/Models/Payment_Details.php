<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment_Details extends Model
{
    //
    use SoftDeletes;
    protected $table = 'payment_details';
    protected $fillable = [
        'student_info_id',
        'fee_type',
        'fee_id',
        'amount'
    ];
}
