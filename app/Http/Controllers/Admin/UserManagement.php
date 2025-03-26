<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserManagement extends Controller
{
    //
    public function index() {
        $user = User::all();
        return Inertia::render('Admin/Usermanagement', ['user'=>$user]);
    }

    public function createUser() {
        return Inertia::render('Admin/UserManagement/CreateUser');
    }
}
