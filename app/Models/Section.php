<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    //
    protected $table = 'section';
    protected $fillable = [
        'name',
        'program_code',
        'year_level',
        'semester'
    ];

    public function schedule()
    {
        return $this->hasMany(Schedule::class, 'section_name', 'name');
    }
}
