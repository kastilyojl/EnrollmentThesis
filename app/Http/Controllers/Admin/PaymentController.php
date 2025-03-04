<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Student\PaymentVerification;
use App\Models\Billing_Type;
use App\Models\Payment_Verification;
use App\Models\User;
use Illuminate\Http\Request;
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

            if ($request->hasFile('payment_receipt')) {
                $path = $request->file('payment_receipt')->store('images');
                
            Payment_Verification::create([
                'users_id' => $user->id,
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
           
}
