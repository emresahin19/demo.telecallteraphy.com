<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Experts;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class ExpertController extends Controller
{
    public function index() {
        $data = Experts::get();
        
        return response()->json([
            'status' => true,
            'data' => $data,
        ], 200);
    }
    public function user($id) {
        $data = [];
        $expert = Experts::where('id', $id)->first();
        $user = User::where('customer_id', $id)->first();
        $data = collect($data)->merge($expert)->merge($user);

        return response()->json([
            'status' => true,
            'data' => $data,
        ], 200);
    }
    public function store(Request $request) {
        $request = $request->all();
        $validator = Validator::make($request, [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone' => 'required|min:10',
            'email' => 'required|string|email|max:255',
            'job' => 'required|string|max:255',
            'specialist' => 'required|string|max:255',
            'education' => 'required',
            'school' => 'required|string|max:255',
            'graduate' => 'required|string|max:255',
            'nickname' => 'required|string|max:255',
            'role' => 'required',
            'password' => 'required|string|confirmed|min:8',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'msg' => $validator->errors()->all()
            ]);
        }
        else {
            $data = Experts::create($request);
            $data->save();

            $user = User::create([
                'email' => $request['email'],
                'customer_id' => $data->id,
                'password' => Hash::make($request['password']),
            ]);

            $msg = ['Başarıyla Kaydedildi.'];

            return response()->json([
                'status' => true,
                'user' => $user,
                'data' => $data,
                'msg' => $msg,
            ], 200);
        }
        
    }

    public function edit($id, Request $request) {
        $request = $request->all();

        $validator = Validator::make($request, [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone' => 'required|min:10',
            'email' => 'required|string|email|max:255',
            'job' => 'required|string|max:255',
            'specialist' => 'required|string|max:255',
            'education' => 'required',
            'school' => 'required|string|max:255',
            'graduate' => 'required|string|max:255',
            'nickname' => 'required|string|max:255',
            'role' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'msg' => $validator->errors()->all()
            ]);
        }
        else {
            $data = Experts::where('id', $id)->first();
            $data->update($request);

            $msg = ['Başarıyla Kaydedildi.'];

            return response()->json([
                'status' => true,
                'data' => $data,
                'msg' => $msg,
            ], 200);
        }
    }
}
