<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SHS_Billing extends Model
{
    //
    use SoftDeletes;
    protected $table  = 'shs_billing';
    protected $fillable = [
            'program_code',
            'year_level',
            'payment_type',
            'cash',
            'installment',
            'voucher_amount',
            'onetime_fee',
            'down_payment_shs',
    ];

    public function programs()
    {
        return $this->belongsTo(User::class, 'program_code', 'code');
    }
}
