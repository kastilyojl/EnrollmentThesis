<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProgramRequest;
use App\Models\Programs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index() {
        $program = Programs::all();
        return Inertia::render('Admin/Program', ['program'=>$program]);
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
