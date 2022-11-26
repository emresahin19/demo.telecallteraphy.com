<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PatientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('patients')->insert([
            [
                'id' => 1,
                'user_id' => 3,
                'name' => 'Mehmet',
                'surname' => 'Şahin',
                'role' => 3,
                'email' => 'admin_patient@admin.com',
                'phone' => '5078345929',
                'nickname' => 'admin_patient',
                'avatar' => 'avatar1.png',
                'expert_id' => 1,
                'diagnosis' => 'Depresyon',
                'note' => 'long text',
            ],
            [
                'id' => 2,
                'user_id' => 4,
                'name' => 'Hüseyin',
                'surname' => 'Yüce',
                'role' => 3,
                'email' => 'ali_patient@admin.com',
                'phone' => '5278315323',
                'nickname' => 'ali_patient',
                'avatar' => 'avatar2.png',
                'expert_id' => 2,
                'diagnosis' => 'Psikopatlık',
                'note' => 'long text',
            ],
        ]);
    }
}
