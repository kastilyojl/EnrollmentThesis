<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Programs extends Model
{
    //
    use SoftDeletes;
    protected $table = 'programs';
    protected $fillable = [
        'code',
        'name',
        'department',
        'campus',
        'status',
        'duration'
    ];

    public function subjects() {
        return $this->hasOne(Subjects::class, 'program_code', 'code');
    }

    public function shsBilling()
    {
        return $this->hasOne(SHS_Billing::class, 'program_code', 'code');
    }

    public function collegeBilling()
    {
        return $this->hasOne(College_Billing::class, 'program_code', 'code');
    }
    
    public function otherBilling()
    {
        return $this->hasOne(Other_Billing::class, 'program_code', 'code');
    }
}
