<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Academic_Year extends Model
{
    //
    use SoftDeletes;
    protected $table = "academic_year";
    protected $fillable = [
        'start',
        'end',
        'status'
    ];
}
