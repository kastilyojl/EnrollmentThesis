<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Student_Info extends Model
{
    use HasFactory, Notifiable;
    // 
    use SoftDeletes;
    protected $table = 'student_info';
    protected $fillable = [
        'student_id',
        'department',
        'school_year',
        'semester',
        'branch',
        'year_level',
        'program',
        'classified_as',
        'last_school_attended',
        'last_school_address',
        'status'
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }

    public function personalInfo()
    {
        return $this->hasOne(Personal_Info::class, 'student_info_id', 'student_id');
    }

    public function guardian()
    {
        return $this->hasOne(Guardian::class, 'student_info_id', 'student_id');
    }

    public function documents() 
    {
        return $this->hasOne(Documents::class, 'student_info_id', 'student_id');   
    }

    public function paymentVerification() 
    {
        return $this->hasOne(Payment_Verification::class, 'student_info_id', 'student_id');
    }
    
}
