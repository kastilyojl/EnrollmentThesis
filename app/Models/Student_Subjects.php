<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student_Subjects extends Model
{
    //
    use SoftDeletes;
    protected $table = "student_subjects"; 
    protected $fillable = [
        'student_info_id',
        'subject_code',
        'status'
    ];
}
