<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Academic_Year;
use App\Models\College_Billing;
use App\Models\Other_Billing;
use App\Models\Programs;
use App\Models\Section_Student;
use App\Models\Student_Info;
use App\Models\Subjects;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    //
    public function index() {
        $student = Student_Info::with('users','personalInfo', 'documents', 'guardian', 'paymentVerification')->get();
        $college_fee = College_Billing::all();
        $subjects = Subjects::all();
        $other_fee = Other_Billing::all();
        return Inertia::render('Admin/Enrollment', ['student'=>$student, 'college_fee'=>$college_fee, 'subjects'=>$subjects, 'other_fee' => $other_fee]);
    }

    public function studentEnrolled(Request $request)
    {
        $perPage = $request->input('per_page', session('rows_per_page', 10));

        session(['rows_per_page' => $perPage]);
    
        $query = Section_Student::with([
                'studentInfo:student_id,users_id,year_level,semester',
                'studentInfo.personalInfo:student_info_id,first_name,last_name',
                'section:id,name'
            ]);

            if ($request->has('search') && !empty($request->search)) {
                $searchTerm = $request->search;
                $query->whereHas('studentInfo.personalInfo', function ($q) use ($searchTerm) {
                    $q->where('first_name', 'like', "%{$searchTerm}%")
                      ->orWhere('last_name', 'like', "%{$searchTerm}%")
                      ->orWhere('student_id', 'like', "%{$searchTerm}%");
                });
            }
        
            if ($request->has('filter') && $request->filter && $request->filter !== 'All') {
                $query->whereHas('studentInfo',function($q) use ($request) {
                    $q->where('semester', $request->filter)
                      ->orWhere('year_level', $request->filter);
                });
            }

            if ($request->filled('academic_year_id')) {
                $academic = Academic_Year::find($request->academic_year_id);
    
                if ($academic) {
                    $query->whereBetween('created_at', [$academic->start, $academic->end]);
                }
            }

            $students = $query->paginate($perPage);

        return Inertia::render('Admin/EnrolledStudent', [
            'student' => $students,  
            'filters' => $request->only(['search', 'filter', 'per_page'])
        ]);
    }
}
