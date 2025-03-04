<?php

use App\Http\Controllers\Admin\AdminApplicationController;
use App\Http\Controllers\Admin\BillingController;
use App\Http\Controllers\Admin\EmailController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\ProgramController;
use App\Http\Controllers\Admin\SubjectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Student\ApplicationController;
use App\Models\Programs;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/', function () {
//     return Inertia::render('Dashboard', ['program'=>Programs::all()]);
//         for git
// });

Route::get('/', function () {
    return Inertia::render('Public/LandingPage');
})->name('home');
Route::get('/mail-send/{id}/approved', [EmailController::class, 'sendEmailSuccess'])->name('send.email');
Route::get('/mail-send/{id}/rejected', [EmailController::class, 'sendEmailRejected'])->name('send.email.rejected');
Route::get('/mail-send/{id}/onhold', [EmailController::class, 'sendEmailOnHold'])->name('send.email.onhold');

Route::group([], function () {
    Route::get('/404', function () {
        return Inertia::render('Error404');
    })->name('404');
    Route::get('/200', function () {
        return Inertia::render('Success');
    })->name('200');
});

Route::group([], function () {
    Route::get('/application', [ApplicationController::class, 'index'])->name('landing-page.section.application');
    Route::post('/application', [ApplicationController::class, 'create'])->name('public.application.submit');
    Route::get('/application/payment', [PaymentController::class, 'index'])->name('public.payment.submit');
    Route::post('/private-file', [PaymentController::class, 'store'])->name('student.payment');
    Route::post('/private-file/{id}/update', [PaymentController::class, 'edit'])->name("admin.payment.update");
    Route::get('/private-files/{filename}', [PaymentController::class, 'showImage'])->name("admin.payment.showImage");
    Route::delete('/private-files/{id}/delete', [PaymentController::class, 'destroy'])->name("admin.payment.destroy");
    
});

Route::prefix('admin/application')->group(function () {
    Route::get('/', [AdminApplicationController::class, 'index'])->name("admin.application");
    Route::post('/{id}/update', [AdminApplicationController::class, 'edit'])->name("admin.application.update");
    Route::get('/documents', [AdminApplicationController::class, 'indexDocuments'])->name("admin.documents");
    Route::post('/document/{id}/update', [AdminApplicationController::class, 'updateDocuments'])->name("admin.documents.update");
    Route::delete('/document/{id}/delete', [AdminApplicationController::class, 'destroyDocuments'])->name("admin.documents.destroy");
    });

Route::prefix('email')->group( function () {
    Route::get('/', [EmailController::class, 'index'])->name('admin.email');
});

Route::get('/program', [ProgramController::class, 'index'])->name("admin.program");
Route::post('/program/store', [ProgramController::class, 'store'])->name("admin.program.store");
Route::post('/program/{id}/update', [ProgramController::class, 'edit'])->name("admin.program.update");
Route::delete('/program/{id}/delete', [ProgramController::class, 'destroy'])->name("admin.program.destroy");

Route::get('/subject', [SubjectController::class, 'index'])->name("admin.subject");
Route::post('/subject/store', [SubjectController::class, 'store'])->name("admin.subject.store");
Route::post('/subject/{id}/update', [SubjectController::class, 'edit'])->name("admin.subject.update");
Route::delete('/subject/{id}/delete', [SubjectController::class, 'destroy'])->name("admin.subject.destroy");

Route::prefix('billing')->group(function () {
    Route::get('/', [BillingController::class, 'index'])->name('admin.billing');
    Route::post('/store', [BillingController::class, 'store'])->name("admin.billing.store");
    Route::get('/payment', [PaymentController::class, 'indexPayment'])->name("admin.payment");
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
