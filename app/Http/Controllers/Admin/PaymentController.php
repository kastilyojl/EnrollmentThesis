<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\PaymentVerification;
use App\Models\Billing_Type;
use App\Models\Payment_Details;
use App\Models\Payment_Verification;
use App\Models\Student_Info;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
    // Student

    public function index() {
        return Inertia::render("Public/Section/TuitionFee");
    }

    public function store(PaymentVerification $request) {
       
        $user = User::where('email', $request->email)->first();
        
        if($user) {
            $items = Student_Info::where('users_id', $user->id)->first();

            if ($request->hasFile('payment_receipt')) {
                $path = $request->file('payment_receipt')->store('images');
                
            Payment_Verification::create([
                'student_info_id' => $items->student_id,
                
                'name' => $request->name,
                'year_level' => $request->year_level,
                'program' => $request->program,
                'email' => $request->email,
                'purpose' => $request->purpose,
                'semester' => $request->semester,
                'amount' => $request->amount,
                'reference' => $request->reference,
                'payment_receipt' => $path,
                'status' => 'pending'
            ]);
            return Inertia::render('Success');
        } 
    }

}
        // Admin

        public function indexPayment() {
            $payment = Payment_Verification::all();
            return Inertia::render('Admin/Payment', ['payment'=>$payment]);
        }

        public function edit(PaymentVerification $request) {
            $items = Payment_Verification::where('id', $request->id)->first();
                
                $items->update([
                    'name' => $request->name,
                    'year_level' => $request->year_level,
                    'program' => $request->program,
                    'email' => $request->email,
                    'purpose' => $request->purpose,
                    'semester' => $request->semester,
                    'amount' => $request->amount,
                    'reference' => $request->reference,
                    'status' => $request->status,
                ]);
            
        }

        public function showImage($filename) {
            $path = storage_path('app/private/images/' . $filename);

            if (!file_exists($path)) {
                abort(404);
            }
            return response()->file($path);
            }

        public function destroy($id) {
            Payment_Verification::findOrFail($id)->delete();
        }

        public function storePaymentDetails(Request $request) {
            Log::info($request->paymentDetails);
        
            foreach ($request->paymentDetails as $paymentDetail) {
                Payment_Details::create([
                    'student_info_id' => $paymentDetail['student_info_id'],
                    'fee_type' => $paymentDetail['fee_type'],
                    'fee_id' => $paymentDetail['fee_id'],
                    'amount_paid' => $paymentDetail['amount'], // Save the amount (either positive or negative)
                ]);
            }
        
            return response()->json(['message' => 'Payment details saved successfully.'], 200);
        }
        

        
           
}
