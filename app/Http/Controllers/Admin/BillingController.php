<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BillingTypeRequest;
use App\Http\Requests\SHSBillingRequest;
use App\Models\Billing_Type;
use App\Models\College_Billing;
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
        $fee = SHS_Billing::all();
        return Inertia::render("Admin/BillingSetup", ['program'=>$program, 'subject'=>$subject, 'fee' => $fee]);
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
    }
}