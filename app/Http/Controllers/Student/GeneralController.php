<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Academic_Year;
use App\Models\College_Billing;
use App\Models\DisplaySetting;
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
    $user = auth()->user();

    $studentInfo = $user->studentInfo;

    if (!$studentInfo) {
        dd('No student info found for user', $user->id);
    }

    $grades = $studentInfo->grades;

    if ($grades->isEmpty()) {
        dd('No grades found for student_info_id', $studentInfo->student_id);
    }

    $mappedGrades = $grades->map(function ($grade) {
        return [
            'id' => $grade->id,
            'subject' => $grade->subject,
            'semester' => $grade->semester,
            'year_level' => $grade->year_level,
            'grade' => $grade->grade,
            'status' => $grade->status,
        ];
    });

    $settings = DisplaySetting::first();

    return Inertia::render('Dashboard/Student/Grades', [
        'grades' => $mappedGrades,
        'gradeSidebarEnabled' => $settings?->grade_sidebar ?? false,
    ]);
}


    public function enrollment() {
        return Inertia::render('Dashboard/Student/Enrollment');
    }


    public function payment(Request $request)
    {
        $user = Auth::user();
    
        $academic = null;
    
        if ($request->filled('academic_year_id')) {
            $academic = Academic_Year::find($request->academic_year_id);
        }
    
        $payment = $user->studentInfo()->with([
            'paymentVerification' => function ($query) use ($academic) {
                if ($academic) {
                    $query->whereBetween('created_at', [$academic->start, $academic->end]);
                }
            }
        ])->first();
    
        return Inertia::render('Dashboard/Student/Payment', [
            'student' => $payment,
        ]);
    }

    public function plan(Request $request)
    {
        $user = Auth::user();
        $academic = null;
    
        if ($request->filled('academic_year_id')) {
            $academic = Academic_Year::find($request->academic_year_id);
        }
    
        $payment = $user->studentInfo()->with([
            'paymentDetails' => function ($query) use ($academic) {
                if ($academic) {
                    $query->whereDate('created_at', '>=', $academic->start)
                          ->whereDate('created_at', '<=', $academic->end);
                    
                }
            }
        ])->first();
    
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
    
        $subjects = $user->studentInfo()->with('studentSubjects.subject')->first();

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

    public function evaluation()
{
    $user = auth()->user();

    $studentInfo = $user->studentInfo()->with([
        'documents',
        'grades',
        'paymentVerification'
    ])->firstOrFail();

    $grades = $studentInfo->grades;

    $mappedGrades = $grades->map(function ($grade) {
        return [
            'id' => $grade->id,
            'subject' => $grade->subject,
            'semester' => $grade->semester,
            'year_level' => $grade->year_level,
            'grade' => $grade->grade,
            'status' => $grade->status,
        ];
    });

    $averageGrade = $grades->isNotEmpty()
        ? round($grades->pluck('grade')->avg(), 2)
        : null;

    return Inertia::render('Dashboard/Student/Evaluation', [
        'student' => $studentInfo,
        'grades' => $mappedGrades,
        'averageGrade' => $averageGrade,
        'department' => $studentInfo->department, 
    ]);
}

    
    public function paymentForm() {
        $user = Auth::user();
    
        $studentInfo = $user->studentInfo()->with('personalInfo', 'guardian')->first();

        return Inertia::render('Dashboard/Student/PaymentForm', [
            'student' => $studentInfo,
            'user' => $user
        ]);
       
    }
    
}
