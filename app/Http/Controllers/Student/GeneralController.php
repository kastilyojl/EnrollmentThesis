<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\College_Billing;
use App\Models\Other_Billing;
use App\Models\Schedule;
use App\Models\Section;
use App\Models\SHS_Billing;
use App\Models\Student_Info;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GeneralController extends Controller
{
    public function personalInfo()
    {
        $user = Auth::user();
    
        $studentInfo = $user->studentInfo()->with('personalInfo', 'guardian')->first();

        return Inertia::render('Dashboard/Student/PersonalInformation', [
            'student' => $studentInfo,
            'user' => $user
        ]);
    }

    public function documents()
    {
        $user = Auth::user();
    
        $documents = $user->studentInfo()->with('documents')->first();

        return Inertia::render('Dashboard/Student/Documents', [
            'student' => $documents,
        ]);
    }

    public function grades()
    {
        $user = Auth::user();
    
        $documents = $user->studentInfo()->with('documents')->first();

        return Inertia::render('Dashboard/Student/Grades', [
            'student' => $documents,
        ]);
    }

    public function enrollment() {
        return Inertia::render('Dashboard/Student/Enrollment');
    }

    public function payment()
    {
        $user = Auth::user();
    
        $payment = $user->studentInfo()->with('paymentVerification')->first();

        return Inertia::render('Dashboard/Student/Payment', [
            'student' => $payment,
        ]);
    }

    public function plan()
    {
        $user = Auth::user();
    
        $payment = $user->studentInfo()->with('paymentDetails')->first();
        $otherBilling = Other_Billing::all();
        $collegeBilling = College_Billing::all();
        $shsBilling = SHS_Billing::all();

        return Inertia::render('Dashboard/Student/PaymentPlan', [
            'student' => $payment,
            'otherBilling'  => $otherBilling,
            'collegeBilling' => $collegeBilling,
            'shsBilling' => $shsBilling
        ]);
    }

    public function subjects()
    {
        $user = Auth::user();
    
        $subjects = $user->studentInfo()->with('studentSubjects')->first();
        // dd($subjects->studentSubjects);

        return Inertia::render('Dashboard/Student/Subject', [
            'student' => $subjects,
        ]);
    }

    public function schedule()
    {
        $user = Auth::user();
    
        $subjects = $user->studentInfo()->with('studentSubjects')->first();
        
        $schedule = Schedule::all();

        return Inertia::render('Dashboard/Student/Schedule', [
            'student' => $subjects, 'schedule' => $schedule
        ]);
    }
    
}
