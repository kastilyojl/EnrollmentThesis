<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    //

    protected $table = 'schedule';
    protected $fillable = [
        'section_name',
        "subject_code",
        'prof_name',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ];

    public function section()
    {
        return $this->belongsTo(Section::class, 'section_name', 'name');
    }
}
