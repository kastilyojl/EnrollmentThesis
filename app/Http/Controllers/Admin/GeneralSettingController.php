<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FAQ;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class GeneralSettingController extends Controller
{
    //
    public function index() {
        $faq = FAQ::all();
        return Inertia::render("Admin/General", ['faq'=>$faq]);
    }

    public function academicYear() {
        return Inertia::render("Admin/General/AcademicYear");
    }

    public function faqStore(Request $request) {
       FAQ::create([
        'question'=>$request->question,
        'answer'=>$request->answer,
       ]);
    }

    public function faqEdit(Request $request) {
        Log::info($request->all());
        $faq = FAQ::findOrFail($request->id);
        $faq->update([
            'question'=>$request->question,
            'answer'=>$request->answer
        ]);
    }

    public function faqDestroy($id) {
        FAQ::findOrFail($id)->delete();
    }

}
