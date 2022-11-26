<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ExpertsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('experts')->insert([
            [
                'id' => 1,
                'user_id' => 1,
                'name' => 'Emre',
                'surname' => 'Şahin',
                'role' => 0,
                'email' => 'admin@admin.com',
                'phone' => '5078345929',
                'job' => 'Psikiyatr',
                'specialist' => 'Psikoloji',
                'education' => 'Lisans',
                'school' => 'İstanbul Üniversitesi',
                'graduate' => '2012',
                'nickname' => 'admin',
                'avatar' => 'avatar1.png',
            ],
            [
                'id' => 2,
                'user_id' => 2,
                'name' => 'Ali',
                'surname' => 'Yüce',
                'role' => 1,
                'email' => 'ali@admin.com',
                'phone' => '5278315323',
                'job' => 'Psikiyatr',
                'specialist' => 'Psikoloji',
                'education' => 'Lisans',
                'school' => 'İstanbul Üniversitesi',
                'graduate' => '2012',
                'nickname' => 'ali',
                'avatar' => 'avatar2.png',
            ],
        ]);
    }
}
