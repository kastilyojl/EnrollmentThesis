<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\GreetingEmail;
use App\Models\Email_Logs;
use App\Models\Student_Info;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class EmailController extends Controller
{
    //
    public function index() {
        $student = Student_Info::with('personalInfo', 'users')->paginate(10);
        return Inertia::render('Admin/Features/Email/SendEmail', ['student'=>$student]);
    }

    public function sendEmailSuccess(Request $request) {

        $email = Student_Info::findOrFail($request->id);
        $user = $email->users;

        $to = $user->email;
        $message = "Greetings,
                    We are happy to inform you that your application has been approved. You can now submit your documents to the registrar's office and pay the required tuition fee to officially enroll. For more information, you can visit our website.
                    
                    Thank you.";
        $subject = "Application Approved";

        Email_Logs::create([
            'users_id' => $user->id,
            'application' => 'sent'
        ]);

        Mail::raw($message, function ($message) use ($to, $subject) {
            $message->to($to)
                    ->subject($subject);
        });

    }

    public function sendEmailRejected(Request $request) {

        // $to = "ljohn0148@gmail.com";
        // $msg = "TEST";
        // $subject = "TEST";

        // Mail::to($to)->send(new GreetingEmail($msg, $subject));

        $email = Student_Info::findOrFail($request->id);
        $user = $email->users;

        $to = $user->email;
        $message = "Greetings,

                    We regret to inform you that your application has been rejected. Unfortunately, we are unable to move forward with your application at this time. If you have any questions or would like to know more about the decision, feel free to contact our office for further clarification.

                    Thank you for your interest, and we wish you the best in your future endeavors.";

                    $subject = "Application Rejected";

        Email_Logs::create([
            'users_id' => $user->id,
            'application' => 'sent'
        ]);

        Mail::raw($message, function ($message) use ($to, $subject) {
            $message->to($to)
                    ->subject($subject);
        });

    }

    public function sendEmailOnHold(Request $request) {

        // $to = "ljohn0148@gmail.com";
        // $msg = "TEST";
        // $subject = "TEST";

        // Mail::to($to)->send(new GreetingEmail($msg, $subject));

        $email = Student_Info::findOrFail($request->id);
        $user = $email->users;

        $to = $user->email;
        $message = "Greetings,

                    We would like to inform you that your application is currently on hold. We are still reviewing your submission and will notify you as soon as a decision is made. Please be patient during this process. If you have any questions or need further information, don't hesitate to contact us.

                    Thank you for your understanding.";

                    $subject = "Application On Hold";


        Email_Logs::create([
            'users_id' => $user->id,
            'application' => 'sent'
        ]);

        Mail::raw($message, function ($message) use ($to, $subject) {
            $message->to($to)
                    ->subject($subject);
        });

    }

    public function sendEmailOfficiallyEnrolled(Request $request) {

        $email = Student_Info::findOrFail($request->id);
        $user = $email->users;

        $to = $user->email;
        $message = "Greetings,
                    We are happy to inform you that your now Officially Enrolled. You can now login to your student portal using this credential: 
                        email: ". $user->email . 
                        " password: WITI@123. 
                    
                    Thank you.";
        $subject = "Application Approved";

        Email_Logs::create([
            'users_id' => $user->id,
            'application' => 'sent'
        ]);

        Mail::raw($message, function ($message) use ($to, $subject) {
            $message->to($to)
                    ->subject($subject);
        });

    }
}
