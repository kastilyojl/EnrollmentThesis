<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    //
    public function admissionGuide() {
        return Inertia::render('Public/Section/AdmissionGuide');
    }
}
