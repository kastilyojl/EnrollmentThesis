<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Documents;
use App\Models\Programs;
use App\Models\Student_Info;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminApplicationController extends Controller
{
    public function index() {
        $student = Student_Info::with('users','personalInfo', 'guardian')->get();
        return Inertia::render('Admin/Application', ['student'=>$student]);
    }

    public function add() {
        $program = Programs::all();
        return Inertia::render('Admin/Features/Application/ApplicationAdd', ['program'=>$program]);
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
        $documents = Documents::findOrFail($request->id);
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

    public function destroyDocuments($id) {
        Documents::findOrFail($id)->delete();
    }
}
