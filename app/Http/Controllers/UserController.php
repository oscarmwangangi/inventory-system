<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Return all users as JSON.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // You can add additional CRUD methods (store, update, delete) here as needed.
}
