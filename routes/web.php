<?php

use App\Http\Controllers\Admin\BillingController;
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

Route::get('/404', function () {
    return Inertia::render('Error404');
})->name('404');

Route::prefix('/public')->group( function () {
    Route::get('/application', [ApplicationController::class, 'index'])->name('landing-page.section.application');
    Route::post('/application', [ApplicationController::class, 'create'])->name('public.application.submit');
});


Route::get('/program', [ProgramController::class, 'index'])->name("admin.program");
Route::post('/program/store', [ProgramController::class, 'store'])->name("admin.program.store");
Route::post('/program/{id}/update', [ProgramController::class, 'edit'])->name("admin.program.update");
Route::delete('/program/{id}/delete', [ProgramController::class, 'destroy'])->name("admin.program.destroy");

Route::get('/subject', [SubjectController::class, 'index'])->name("admin.subject");
Route::post('/subject/store', [SubjectController::class, 'store'])->name("admin.subject.store");
Route::post('/subject/{id}/update', [SubjectController::class, 'edit'])->name("admin.subject.update");
Route::delete('/subject/{id}/delete', [SubjectController::class, 'destroy'])->name("admin.subject.destroy");

Route::get('billing', [BillingController::class, 'index'])->name('admin.billing');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
