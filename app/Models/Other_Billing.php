<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Other_Billing extends Model
{
    //
    use SoftDeletes;
    protected $table  = 'other_billing';
    protected $fillable = [
        'title',
        'amount',
       'description',
       
    ];

    public function programs()
    {
        return $this->belongsTo(User::class, 'program_code', 'code');
    }
}
