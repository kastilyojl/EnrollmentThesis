<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\College_Billing;
use App\Models\Programs;
use App\Models\Student_Info;
use App\Models\Subjects;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    //
    public function index() {
        $student = Student_Info::with('users','personalInfo', 'documents', 'guardian', 'paymentVerification')->get();
        $college_fee = College_Billing::all();
        $subjects = Subjects::all();
        return Inertia::render('Admin/Enrollment', ['student'=>$student, 'college_fee'=>$college_fee, 'subjects'=>$subjects]);
    }
}
