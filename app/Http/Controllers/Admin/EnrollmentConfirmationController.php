<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Models\Section_Student;
use App\Models\Student_Info;
use App\Models\User;
use App\Models\Users_IDFormat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EnrollmentConfirmationController extends Controller
{
    //
    public function index(Request $request) {
        $perPage = $request->input('per_page', session('rows_per_page', 10));
        
        session(['rows_per_page' => $perPage]);

        $query = Student_Info::with('users', 'personalInfo', 'guardian');
        $section = Section::all();
        $id_format = Users_IDFormat::where('user_type','student')->first();

        if ($request->has('search') && !empty($request->search)) {
            $query->whereHas('personalInfo', function($q) use ($request) {
                $q->where('first_name', 'like', "%{$request->search}%")
                ->orWhere('last_name', 'like', "%{$request->search}%")
                ->orWhere('department', 'like', "%{$request->search}%");
            });
        }
        
        if ($request->has('program') && $request->program && $request->program !== 'All') {
            $query->where('program', $request->program);
        }
        
        $student = $query->paginate($perPage);
        return Inertia::render('Admin/EnrollmentConfirmation', 
            ['student' => $student,
            'section' => $section,
            'id_format' => $id_format,
            'filters' => $request->only(['search', 'program', 'per_page'])]);
    }

    public function insertStudentSection(Request $request) {

        DB::beginTransaction();

        try {
            $items = Student_Info::where('student_id', $request->student_id)->first();
    
            if (!$items) {
                return response()->json(['error' => 'Student not found'], 404);
            }
    
            $items->update([
                'student_id' => $request->student_info_id,
            ]);
    
            Section_Student::create([
                'section_id' => $request->section_id,
                'student_info_id' => $request->student_info_id,
                'status' => $request->status,
            ]);

            $format = Users_IDFormat::where('id_format', $request->student_info_id)->first();

            if ($format) {
                // Assuming format like STUD-0001
                $currentId = $format->id_format;

                // Extract prefix and number
                preg_match('/^([A-Z]+[\-\_]?)(\d+)$/', $currentId, $matches);

                if (count($matches) === 3) {
                    $prefix = $matches[1];           // STUD- or STUD_
                    $number = (int) $matches[2];     // 1

                    $newNumber = $number + 1;

                    // Format new number with leading zeros
                    $formattedNumber = str_pad($newNumber, strlen($matches[2]), '0', STR_PAD_LEFT);

                    // Create new ID format
                    $newIdFormat = $prefix . $formattedNumber;

                    // Update it in DB
                    $format->update([
                        'id_format' => $newIdFormat,
                    ]);
                }
            }
            DB::commit();
            $items = Student_Info::where('users_id', $request->users_id)->first();
            return redirect()->route('send.email.official-enroll', ['users_id' => $items->users_id]);
    
            
    
            return redirect()->route('enrollment.final.step');
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Something went wrong', 'details' => $e->getMessage()], 500);
        }
    }
}
