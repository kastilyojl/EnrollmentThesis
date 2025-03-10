<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Programs;
use Inertia\Inertia;

class CurriculumController extends Controller
{
    //
    public function index() {
        $program = Programs::with('subjects')->get();
        return Inertia::render('Admin/Curriculum', ['program'=>$program]);
    }
}
