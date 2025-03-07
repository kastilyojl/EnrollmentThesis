<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student_Info;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    //
    public function index() {
        $student = Student_Info::with('users','personalInfo', 'documents', 'guardian', 'paymentVerification')->get();
        return Inertia::render('Admin/Enrollment', ['student'=>$student]);
    }
}
