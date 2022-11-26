<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(){
        $data = User::get();

        return response()->json([
            'status' => true,
            'data' => $data,
        ], 200);
    }
}
