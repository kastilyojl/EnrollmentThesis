<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserManagement extends Controller
{
    //
    public function index(Request $request) {
        $perPage = $request->input('per_page', session('rows_per_page', 10));
        
        session(['rows_per_page' => $perPage]);

        $query = User::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                ->orWhere('role', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%");
            });
        }
        
        if ($request->has('program') && $request->program && $request->program !== 'All') {
            $query->where('program', $request->program);
        }

        $user = $query->paginate($perPage);
        return Inertia::render('Admin/Usermanagement', ['user'=>$user,  'filters' => $request->only(['search', 'program', 'per_page'])]);
    }

    public function createUser() {
        return Inertia::render('Admin/UserManagement/CreateUser');
    }
}
