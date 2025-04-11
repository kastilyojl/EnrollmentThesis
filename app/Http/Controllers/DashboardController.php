<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Programs;
use App\Models\Student_Info;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $adminCount = User::whereIn('role', ['super admin', 'accounting', 'registrar'])->count();
        $professorCount = User::where('role', 'professor')->count();
        $studentCount = User::where('role', 'student')->count();
        $shsCount = Programs::where('department', 'SHS')->count();
        $collegeCount = Programs::where('department', 'College')->count();
        $preEnrolledCount = Student_Info::whereIn('status', ['pending', 'onhold'])->count();
        $shsEnrolledCount = Student_Info::where('status', 'enrolled')
                ->where('department', 'SHS')
                ->selectRaw('DATE(created_at) as date, count(*) as count')
                ->groupBy('date')
                ->orderBy('date')
                ->get();
        $collegeEnrolledCount = Student_Info::where('status', 'enrolled')
                ->where('department', 'College')
                ->selectRaw('DATE(created_at) as date, count(*) as count')
                ->groupBy('date')
                ->orderBy('date')
                ->get();


        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'adminCount' => $adminCount,
            'professorCount' => $professorCount,
            'studentCount' => $studentCount,
            'shsCount' => $shsCount,
            'collegeCount' => $collegeCount,
            'preEnrolledCount' => $preEnrolledCount,
            'shsEnrolledCount' => $shsEnrolledCount,
            'collegeEnrolledCount' => $collegeEnrolledCount
        ]);
    }

    public function enrollment() {
        $shsEnrolledCount = Student_Info::where('status', 'enrolled')
                ->where('department', 'SHS')
                ->selectRaw('DATE(created_at) as date, count(*) as count')
                ->groupBy('date')
                ->orderBy('date')
                ->get();
        $collegeEnrolledCount = Student_Info::where('status', 'enrolled')
                ->where('department', 'College')
                ->selectRaw('DATE(created_at) as date, count(*) as count')
                ->groupBy('date')
                ->orderBy('date')
                ->get();

        $studentEnrolled = Student_Info::orderBy('created_at', 'desc')
                                    ->orderBy('id', 'desc')
                                    ->take(20) 
                                    ->get();

        return Inertia::render('Dashboard/Admin/Enrollment', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'shsEnrolledCount' => $shsEnrolledCount,
            'collegeEnrolledCount' => $collegeEnrolledCount,
            'studentEnrolled' => $studentEnrolled
        ]);
    }

}
