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

    public function store(SHSBillingRequest $request) {
        
            Log::info('Request Data:', $request->all());
            foreach ($request->fees as $shs_Billing) {
                Log::info('Processing fee:', $shs_Billing); 
                $code = Programs::where('code', $shs_Billing['program_code'])->first();
                SHS_Billing::create([
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

                    // "fee_type" => $subject['fee_type'],
                    // "program_name" => $subject['program_name'],
                    // "no_unit" => $subject['no_unit'],
                    // "amount" => $subject['amount'],
                    // "misellaneous_name" => $subject['misellaneous_name'],
                    // "misellaneous_description" => $subject['misellaneous_description'],
                    // "discount_name" => $subject['discount_name'],
                    // "discount_amount" => $subject['discount_amount'],
                    // "total_amount" => $subject['total_amount'],
                    'program_code' =>$code,
                    'year_level' =>$shs_Billing['year_level'],
                    'payment_type' =>$shs_Billing['payment_type'],
                    'cash' =>$shs_Billing['cash'],
                    'installment' =>$shs_Billing['installment'],
                    'voucher_amount' =>$shs_Billing['voucher_amount'],
                    'onetime_fee' =>$shs_Billing['onetime_fee'],
                    'down_payment_shs' =>$shs_Billing['down_payment_shs'],
                    ]);
            }

            foreach ($request->fees as $college_Billing) {
                Log::info('Processing fee:', $college_Billing); 
                $code = Programs::where('code', $college_Billing['program_code'])->first();
                College_Billing::create([
                    'program_code' =>$code,
                    'discount_title'=> $college_Billing['discount_title'],
                    'discount_amount'=> $college_Billing['discount_amount'],
                    'down_payment'=> $college_Billing['down_payment'],
                    'prelim'=> $college_Billing['prelim'],
                    'midterm'=> $college_Billing['midterm'],
                    'finals'=> $college_Billing['finals'],
                    'no_unit'=> $college_Billing['no_unit'],
                    'per_unit'=> $college_Billing['per_unit'],
                    'total_amount'=> $college_Billing['total_amount'],
                    ]);
            }

            foreach ($request->fees as $other_Billing) {
                Log::info('Processing fee:', $other_Billing); 
                
                Other_Billing::create([
                    'title'=> $other_Billing['title'],
                    'amount'=> $other_Billing['amount'],
                    'description'=> $other_Billing['description'],
                    ]);
            }
    }

    public function editSHSFee(Request $request) {

        $items = SHS_Billing::where('id', $request->id)->first();
        $items->update([
            'program_code'=> $request->program_code,
            'year_level'=> $request->year_level,
            'payment_type'=> $request->payment_type,
            'cash'=> $request->cash,
            'installment'=> $request->installment,
            'voucher_amount'=> $request->voucher_amount,
            'onetime_fee'=> $request->onetime_fee,
            'down_payment_shs'=> $request->down_payment_shs,
        ]);
    }

    public function editOtherFee(Request $request) {

        $items = Other_Billing::where('id', $request->id)->first();
        $items->update([
            'title'=>$request->title,
            'amount'=>$request->amount,
            'description' => $request->description,
        ]);
    }

    public function editCollegeFee(Request $request) {

        $items = College_Billing::where('id', $request->id)->first();
        $items->update([
            'program_code' =>$request->program_code,
            'discount_title'=> $request->discount_title,
            'discount_amount'=> $request->discount_amount,
            'down_payment'=> $request->down_payment,
            'prelim'=> $request->prelim,
            'midterm'=> $request->midterm,
            'finals'=> $request->finals,
            'no_unit'=> $request->no_unit,
            'per_unit'=> $request->per_unit,
            'total_amount'=> $request->total_amount,
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