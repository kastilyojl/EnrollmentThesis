<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\ApplicationRequest;
use App\Models\Documents;
use App\Models\Guardian;
use App\Models\Personal_Info;
use App\Models\Programs;
use App\Models\Student_Info;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminApplicationController extends Controller
{
    public function index(Request $request)
{
    $perPage = $request->input('per_page', 2);
    $query = Student_Info::with('users', 'personalInfo', 'guardian');

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
    
    return Inertia::render('Admin/Application', [
        'student' => $student,
        'filters' => $request->only(['search', 'program'])
    ]);
}

    public function add() {
        $program = Programs::all();
        return Inertia::render('Admin/Admission/CreateStudent', ['program'=>$program]);
    }

    public function createStudent(ApplicationRequest $request) {
        // Validate the incoming request data
      
        DB::beginTransaction();
        try {

        $User = new User();
        $User->name = $request->first_name . ' ' . $request->last_name;
        $User->email = $request->email;
        // $randomPassword = Str::password(12);
        $defaultPassword = 'WITI@123';
        $User->password = Hash::make($defaultPassword);
        $User->role = 'student';
        $User->save(); 
        
        $Student_Info = new Student_Info();
        $Student_Info->department = $request->department;
        $Student_Info->student_id = $User->id;
        $Student_Info->school_year = $request->school_year;
        $Student_Info->semester = $request->semester;
        $Student_Info->branch = $request->branch;
        $Student_Info->year_level = $request->year_level;
        $Student_Info->program = $request->program;
        $Student_Info->classified_as = $request->classified_as;
        $Student_Info->last_school_attended = $request->last_school_attended;
        $Student_Info->last_school_address = $request->last_school_address;
       
        $Student_Info->users_id = $User->id;
        $Student_Info->save();

 
        $Personal_Info = new Personal_Info();
        $Personal_Info->first_name = $request->first_name;
        $Personal_Info->last_name = $request->last_name;
        $Personal_Info->middle_name = $request->middle_name;
        $Personal_Info->address = $request->address;
        $Personal_Info->birth_date = $request->birth_date;
        $Personal_Info->birth_place = $request->birth_place;
        $Personal_Info->civil_status =$request->civil_status;
        $Personal_Info->gender = $request->gender;
        $Personal_Info->religion = $request->religion;
       
        $Personal_Info->student_info_id = $Student_Info->student_id;
        $Personal_Info->save();

    
        $Guardian = new Guardian();
        $Guardian->father_name = $request->father_name;
        $Guardian->father_occupation = $request->father_occupation;
        $Guardian->father_phone = $request->father_phone;
        $Guardian->mother_name = $request->mother_name;
        $Guardian->mother_occupation = $request->mother_occupation;
        $Guardian->mother_phone = $request->mother_phone;
        $Guardian->guardian_name = $request->guardian_name;
        $Guardian->guardian_relationship = $request->guardian_relationship;
        $Guardian->guardian_phone = $request->guardian_phone;
        
        $Guardian->student_info_id = $Student_Info->student_id;
        $Guardian->save();

         DB::commit();

         return redirect()->route("admin.application");

        } catch(\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }        
    }

    public function edit(Request $request) {

        $items = Student_Info::where('id', $request->id)->first();
        $items->update([
            'status'=>$request->status,   
        ]);

        if($request->status === 'Approved' || $request->status === 'approved') {

            $existing = Documents::where('student_info_id', $items->student_id)->first();
             if(!$existing) {
                Documents::create([
                    'student_info_id' => $items->student_id,
                ]);
                return redirect()->route('send.email', ['id'=>$items]);
             } else {
                return redirect()->route('send.email', ['id'=>$items]);
             }
            
        } elseif($request->status === 'Reject' || $request->status === 'reject') {
            return redirect()->route('send.email.rejected', ['id'=>$items]);
        } elseif($request->status === 'OnHold' || $request->status === 'onhold') {
            return redirect()->route('send.email.onhold', ['id'=>$items]);
        } 
    }

    public function destroy($id) {
        Programs::findOrFail($id)->delete();
    }

    public function indexDocuments () {
        $student = Student_Info::with('personalInfo', 'documents')
            ->where('status', 'Approved')
            ->paginate(10);
        // $student = Student_Info::with('users','personalInfo', 'guardian')->get();
        return Inertia::render('Admin/Documents', ['student'=>$student]);
    }

    public function updateDocuments(Request $request) {
        $documents = Documents::where('student_info_id', $request->student_info_id)->firstOrFail();
        $documents->update([
            'form_138A' => $request->form_138A,
            'form_137'  => $request->form_137,
            'good_moral'  => $request->good_moral,
            'psa'  => $request->psa,
            'pic_2x2'  => $request->pic_2x2,
            'ctc_transferee'  => $request->ctc_transferee,
            'grade_transferee'  => $request->grade_transferee,
            'f137_transferee'  => $request->f137_transferee,
            'status' => $request->doc_status
        ]);
    }

    public function destroyStudent($id) {
        Student_Info::findOrFail($id)->delete();
    }

    public function destroyDocuments($id) {
        Documents::findOrFail($id)->delete();
    }
}
