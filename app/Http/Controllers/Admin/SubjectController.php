<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubjectRequest;
use App\Models\Programs;
use App\Models\Subjects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index(Request $request) {
    
        $perPage = $request->input('per_page', session('rows_per_page', 10));
        
        session(['rows_per_page' => $perPage]);
        $query = Subjects::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function($q) use ($request) {
                $q->where('program_code', 'like', "%{$request->search}%")
                ->orWhere('code', 'like', "%{$request->search}%")
                ->orWhere('name', 'like', "%{$request->search}%");
            });
        }
        
        // Filter
        if ($request->has('filter') && $request->filter && $request->filter !== 'All') {
            $query->where(function($q) use ($request) {
                $q->where('department', $request->filter)
                  ->orWhere('category', $request->filter)
                  ->orWhere('period', $request->filter);
            });
        }

        $subject = $query->paginate($perPage);
        $program = Programs::all();

        return Inertia::render('Admin/Subject', ['subject'=>$subject,'program'=>$program,  
                        'filters' => $request->only(['search', 'filter', 'per_page']), 
                       ]);
    }


    public function store(Request $request) {
        Log::info($request->all());
        // DB::beginTransaction();
        // try {
            foreach ($request->sub as $subject) {
                $programCode = $subject['program_code'];
                $program = Programs::where('code', $programCode)->first();
                $program_code = $program->code;
                Subjects::create([
                    'program_code' => $program_code,
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
                // DB::commit();
            }
           
        // } catch (\Exception $e) {
            // DB::rollBack();
            return redirect()->back()->with('error', 'An error occurred while saving subjects.');
        // }
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
