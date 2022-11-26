<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Patients;
use App\Models\Experts;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class PatientController extends Controller
{
    public function index() {
        $data = Patients::select('patients.*', 'patients.user_id as patient_uid', 'experts.name as expert_name', 'experts.surname as expert_surname')
                        ->Join('experts','patients.expert_id','experts.id')
                        ->get();
        $experts = Experts::get();

        return response()->json([
            'status' => true,
            'data' => $data,
            'experts' => $experts,
        ], 200);
    }
    public function user($id) {
        $data = [];
        $patient = Patients::select('patients.*', 'experts.name as expert_name', 'experts.surname as expert_surname')
                        ->Join('experts','patients.expert_id','experts.id')
                        ->where('patients.id', $id)
                        ->first();
        $user = User::select('id as user_id', 'customer_id')->where([['customer_id', $id], ['role', 3]])->first();
        $data = collect($data)->merge($patient)->merge($user);

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
            'expert_id' => 'required',
            'diagnosis' => 'required|string|max:255',
            'nickname' => 'required|string|max:255',
            'password' => 'required|string|confirmed|min:8',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'msg' => $validator->errors()->all()
            ]);
        }
        else {
            $data = Patients::create($request);
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
            'expert_id' => 'required',
            'diagnosis' => 'required|string|max:255',
            'nickname' => 'required|string|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'msg' => $validator->errors()->all()
            ]);
        }
        else {
            $data = Patients::where('id', $id)->first();
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
