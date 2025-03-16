<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BillingTypeRequest;
use App\Http\Requests\SHSBillingRequest;
use App\Models\Billing_Type;
use App\Models\College_Billing;
use App\Models\Other_Billing;
use App\Models\Programs;
use App\Models\SHS_Billing;
use App\Models\Subjects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index() {
        $program = Programs::all();
        $subject = Subjects::all();
        $shs_fee = SHS_Billing::all();
        $college_fee = College_Billing::all();
        $other_fee = Other_Billing::all();
        return Inertia::render("Admin/BillingSetup", ['program'=>$program, 'subject'=>$subject, 'shs_fee' => $shs_fee, 'college_fee' => $college_fee, 'other_fee' => $other_fee]);
    }

    public function SHSBilling() {
        $shs_fee = SHS_Billing::all();
        return Inertia::render("Admin/BillingSetup/SHSBilling", ['shs_fee' => $shs_fee]);
    }

    public function storeSHSBilling(SHSBillingRequest $request) {
        SHS_Billing::create([
            'program_code' => $request->program_code,
            'year_level' => $request->year_level,
            'payment_type' => $request->payment_type,
            'down_payment' => $request->down_payment,
            'prelim' => $request->prelim,
            'midterm' => $request->midterm,
            'finals' => $request->finals,
            'total_amount' => $request->total_amount
        ]);
    }

    public function storeCollegeBilling(Request $request) {
            College_Billing::create([
            'program_code' => $request->program_code,
            'year_level' => $request->year_level,
            'payment_type' => $request->payment_type,
            'down_payment' => $request->down_payment,
            'prelim' => $request->prelim,
            'midterm' => $request->midterm,
            'finals' => $request->finals,
            'no_unit' => $request->no_unit,
            'per_unit' => $request->per_unit,
            'total_amount' => $request->total_amount
        ]);
    }

    public function storeOtherBilling(Request $request) {
            foreach ($request->fees as $other_Billing) {
                Other_Billing::create([
                    'payment_type'=> $other_Billing['other_billing_payment_type'],
                    'name'=> $other_Billing['other_billing_name'],
                    'amount'=> $other_Billing['amount'],
                    'description'=> $other_Billing['description'],
                    ]);
            }
    }

    public function editSHSFee(Request $request) {

        $items = SHS_Billing::where('id', $request->id)->first();
        $items->update([
            'program_code' => $request->program_code,
            'year_level' => $request->year_level,
            'payment_type' => $request->payment_type,
            'down_payment' => $request->down_payment,
            'prelim' => $request->prelim,
            'midterm' => $request->midterm,
            'finals' => $request->finals,
            'total_amount' => $request->total_amount
        ]);
    }

    public function editOtherFee(Request $request) {

        $items = Other_Billing::where('id', $request->id)->first();
        $items->update([
            'payment_type'=>$request->payment_type,
            'name'=>$request->name,
            'amount'=>$request->amount,
            'description' => $request->description,
        ]);
    }

    public function editCollegeFee(Request $request) {

        $items = College_Billing::where('id', $request->id)->first();
        $items->update([
            'program_code' => $request->program_code,
            'year_level' => $request->year_level,
            'payment_type' => $request->payment_type,
            'down_payment' => $request->down_payment,
            'prelim' => $request->prelim,
            'midterm' => $request->midterm,
            'finals' => $request->finals,
            'no_unit' =>$request->no_unit,
            'per_unit' =>$request->per_unit, 
            'total_amount' => $request->total_amount
        ]);
    }

    public function destroySHSFee($id) {
        SHS_Billing::findOrFail($id)->delete();
    }

    public function destroyCollegeFee($id) {
        College_Billing::findOrFail($id)->delete();
    }
    
    public function destroyOtherFee($id) {
        Other_Billing::findOrFail($id)->delete();
    }
}