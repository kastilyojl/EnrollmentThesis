<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\College_Billing;
use App\Models\Other_Billing;
use App\Models\Student_Info;
use App\Models\Student_Subjects;
use App\Models\Subjects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CourseSelectionController extends Controller
{
    //
    public function index() {
        $student = Student_Info::with('users','personalInfo', 'documents', 'guardian', 'paymentVerification')->whereHas('documents')
        ->whereHas('paymentVerification')
        ->get();
    
        $college_fee = College_Billing::all();
        $subjects = Subjects::all();
        $other_fee = Other_Billing::all();
        
        return Inertia::render('Admin/AssignCourse', ['student'=>$student, 'college_fee'=>$college_fee, 'subjects'=>$subjects, 'other_fee' => $other_fee]);
    }

    public function store(Request $request) {
        // // Log the entire request payload
        // Log::info('Request Payload: ', $request->all());
    
        // Log the selectedSubjects array
        // Log::info('Selected Subjects Received: ', $request->selectedSubjects);
    
        // Process the selectedSubjects array
        foreach ($request->selectedSubjects as $subjectDetail) {
            
            // Log::info('Processing Subject:', $subjectDetail);
    
            // Create a new record in the database
            Student_Subjects::create([
                'student_info_id' => $request->student_id,
                'subject_code' => $subjectDetail['code'],
                'status' => 'enroll',
            ]);
        }
    
        return redirect()->back()->with('success', 'Subjects saved successfully!');
    }
}
