<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class InterviewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('interviews')->insert([
            [
                'patient_id' => 1,
                'expert_id' => 2,
                'note' => 'Görüşme başarılı',
                'general_note' => 'Genel olarak başarılı',
                'video' => 1,
                'video_path' => 'video_path',
                'video_time' => 360000,
                'video_note' => 'video_note',
                'session_time' => 360000,
            ],
            [
                'patient_id' => 1,
                'expert_id' => 2,
                'note' => 'Görüşme başarılı 2',
                'general_note' => 'Genel olarak başarılı 2',
                'video' => 1,
                'video_path' => 'video_path 2',
                'video_time' => 360000,
                'video_note' => 'video_note 2',
                'session_time' => 360000,
            ],
            [
                'patient_id' => 2,
                'expert_id' => 1,
                'note' => 'Görüşme başarılı',
                'general_note' => 'Genel olarak başarılı',
                'video' => 2,
                'video_path' => 'video_path',
                'video_time' => 420000,
                'video_note' => 'video_note',
                'session_time' => 420000,
            ],
            [
                'patient_id' => 2,
                'expert_id' => 1,
                'note' => 'Görüşme başarılı 2',
                'general_note' => 'Genel olarak başarılı 2',
                'video' => 2,
                'video_path' => 'video_path 2',
                'video_time' => 420000,
                'video_note' => 'video_note 2',
                'session_time' => 420000,
            ],
            [
                'patient_id' => 2,
                'expert_id' => 1,
                'note' => 'Görüşme başarılı 3',
                'general_note' => 'Genel olarak başarılı 3',
                'video' => 2,
                'video_path' => 'video_path 3',
                'video_time' => 420000,
                'video_note' => 'video_note 3',
                'session_time' => 420000,
            ],
        ]);
    }
}
