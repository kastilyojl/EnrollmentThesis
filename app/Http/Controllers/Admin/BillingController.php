<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BillingTypeRequest;
use App\Models\Billing_Type;
use App\Models\Programs;
use App\Models\Subjects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index() {
        $program = Programs::all();
        $subject = Subjects::all();
        $fee = Billing_Type::all();
        return Inertia::render("Admin/BillingSetup", ['program'=>$program, 'subject'=>$subject, 'fee' => $fee]);
    }

    public function store(BillingTypeRequest $request) {
        DB::beginTransaction();
        try {
            foreach ($request->fees as $subject) {
                Billing_Type::create([
                    // 'program_code' => $subject['program_code'],
                    // 'code' => $subject['code'],
                    // 'name' => $subject['name'],
                    // 'prerequisites'  => $subject['prerequisites'],
                    // 'period'  => $subject['period'],
                    // 'department' => $subject['department'],
                    // 'year_level'  => $subject['year_level'],
                    // 'category'  => $subject['category'],
                    // 'lec'  => $subject['lec'],
                    // 'lab'  => $subject['lab'],
                    // 'unit'  => $subject['unit'],
                    // 'total'  => $subject['total'],
                    "fee_type" => $subject['fee_type'],
                    "program_name" => $subject['program_name'],
                    "no_unit" => $subject['no_unit'],
                    "amount" => $subject['amount'],
                    "misellaneous_name" => $subject['misellaneous_name'],
                    "misellaneous_description" => $subject['misellaneous_description'],
                    "discount_name" => $subject['discount_name'],
                    "discount_amount" => $subject['discount_amount'],
                    "total_amount" => $subject['total_amount'],
                        ]);
            }
            DB::commit();
           
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'An error occurred while saving subjects.');
        }
    }
}