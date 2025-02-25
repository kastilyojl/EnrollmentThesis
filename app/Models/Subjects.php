<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subjects extends Model
{
    //
    use SoftDeletes;
    
    protected $table = 'subjects';
    protected $fillable = [
        'program_code',
        'code',
        'name',
        'prerequisites',
        'period',
        'department',
        'year_level',
        'category',
        'lec',
        'lab',
        'unit',
        'total',
    ];

    public function programs() {
        return $this->belongsTo(Programs::class, 'program_code', 'code');
    }
}

