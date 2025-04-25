<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EvaluationController extends Controller
{
    //

    public function index() {
        return Inertia::render('Dashboard/Student/Evaluation');
    }
}
