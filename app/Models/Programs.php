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
}
