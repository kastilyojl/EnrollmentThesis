<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class College_Billing extends Model
{
    //
    use SoftDeletes;
    protected $table  = 'college_billing';
    protected $fillable = [
        'program_code',
        'discount_title',
       'discount_amount',
        'down_payment',
       'prelim',
       'midterm',
        'finals',
        'no_unit',
       'per_unit',
        'total_amount',
    ];

    public function programs()
    {
        return $this->belongsTo(User::class, 'program_code', 'code');
    }
}
