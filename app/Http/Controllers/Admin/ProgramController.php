<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProgramRequest;
use App\Models\Programs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index(Request $request) {
        $perPage = $request->input('per_page', session('rows_per_page', 10));
        
        session(['rows_per_page' => $perPage]);

        $query = Programs::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function($q) use ($request) {
                $q->where('code', 'like', "%{$request->search}%")
                ->orWhere('name', 'like', "%{$request->search}%");
            });
        }
        
        // Filter
        if ($request->has('filter') && $request->filter && $request->filter !== 'All') {
            $query->where(function($q) use ($request) {
                $q->where('department', $request->filter)
                  ->orWhere('campus', $request->filter)
                  ->orWhere('duration', $request->filter)
                  ->orWhere('status', $request->filter);
            });
        }

        $program = $query->paginate($perPage);
        return Inertia::render('Admin/Program', ['program'=>$program,  
                        'filters' => $request->only(['search', 'filter', 'per_page']), 
                       ]);
    }

    public function store(ProgramRequest $request) {
       
        Programs::create([
            'code'=>$request->code,
            'name'=>$request->name,
            'status' => $request->status,
            'campus' => $request->campus,
            'duration' => $request->duration,
            'department' => $request->department,
        ]);
    }

    public function edit(ProgramRequest $request) {

        $items = Programs::where('id', $request->id)->first();
        $items->update([
            'code'=>$request->code,
            'name'=>$request->name,
            'status' => $request->status,
            'campus' => $request->campus,
            'duration' => $request->duration,
            'department' => $request->department,
        ]);
    }

    public function destroy($id) {
        Programs::findOrFail($id)->delete();
    }
}
