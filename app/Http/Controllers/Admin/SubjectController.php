<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubjectRequest;
use App\Models\Programs;
use App\Models\Subjects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index() {
        $program = Programs::all();
        $subject = Subjects::all();
        return Inertia::render("Admin/Subject", ['program'=>$program, 'subject'=>$subject]);
    }

    public function store(SubjectRequest $request) {
        DB::beginTransaction();
        try {
            foreach ($request->sub as $subject) {
                Subjects::create([
                    'program_code' => $subject['program_code'],
                    'code' => $subject['code'],
                    'name' => $subject['name'],
                    'prerequisites'  => $subject['prerequisites'],
                    'period'  => $subject['period'],
                    'department' => $subject['department'],
                    'year_level'  => $subject['year_level'],
                    'category'  => $subject['category'],
                    'lec'  => $subject['lec'],
                    'lab'  => $subject['lab'],
                    'unit'  => $subject['unit'],
                    'total'  => $subject['total'],
                        ]);
            }
            DB::commit();
           
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'An error occurred while saving subjects.');
        }
    }

    public function edit(SubjectRequest $request) {

        $items = Subjects::where('id', $request->id)->first();
        $items->update([
                    'program_code' => $request->program_code,
                    'code' => $request->code,
                    'name' => $request->name,
                    'prerequisites'  => $request->prerequisites,
                    'period'  => $request->period,
                    'department' => $request->department,
                    'year_level'  => $request->year_level,
                    'category'  => $request->category,
                    'lec'  => $request->lec,
                    'lab'  => $request->lab,
                    'unit'  => $request->unit,
                    'total'  => $request->total,
        ]);
    }

    public function destroy($id) {
        Subjects::findOrFail($id)->delete();
    }
    
}
