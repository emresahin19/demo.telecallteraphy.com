<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Patients;
use App\Models\Experts;
use App\Models\Interviews;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class InterviewsController extends Controller
{
    public function index() {
        $interviews = Interviews::select('interviews.id', 'interviews.video_note', 'interviews.created_at as date', 'interviews.patient_id', 
                                    'patients.name as patient_name', 'patients.surname as patient_surname', 
                                    'experts.name as expert_name', 'experts.surname as expert_surname', 
                            )
                            ->LeftJoin('patients', 'interviews.patient_id', 'patients.id' )
                            ->join('experts', 'interviews.expert_id', 'experts.id' )
                            ->orderBy('interviews.created_at', 'DESC');
        $object_data = $interviews->get()->unique('patient_id');
        $data = [];
        foreach ($object_data as $key => $value) {
            $data[] = $value;
        }
        return response()->json([
            'status' => true,
            'data' => $data,
        ]);
    }

    public function detail($id) {
        $data = Interviews::select('interviews.*', 'patients.name as patient_name', 'patients.surname as patient_surname', 'interviews.patient_id', 
                                    'patients.note as patient_note', 'patients.diagnosis', 'patients.avatar', 'patients.email', 'patients.phone', 
                                    'experts.name as expert_name', 'experts.surname as expert_surname', 
                                  )
                            ->join('patients', 'interviews.patient_id', 'patients.id' )
                            ->join('experts', 'interviews.expert_id', 'experts.id' )
                            ->where('interviews.id', $id)
                            ->first();

        return response()->json([
            'status' => true,
            'data' => $data,
        ]);
    }

    public function interview_detail($id) {
        $data = Interviews::select('interviews.id', 'interviews.video_note', 'interviews.created_at as date', 'interviews.patient_id',
                                    'patients.name as patient_name', 'patients.surname as patient_surname', 
                                    'experts.name as expert_name', 'experts.surname as expert_surname', 
                                  )
                            ->join('patients', 'interviews.patient_id', 'patients.id' )
                            ->join('experts', 'interviews.expert_id', 'experts.id' )
                            ->where('interviews.patient_id', $id)
                            ->orderBy('interviews.created_at', 'DESC')
                            ->get();

        return response()->json([
            'status' => true,
            'data' => $data,
        ]);
    }

    public function edit_note(Request $request){
        $note = $request->general_note;
        Interviews::where('id', $request->id)->first()->update(["general_note" => $note]);

        return response()->json([
            'status' => true,
        ]);
    }
}
