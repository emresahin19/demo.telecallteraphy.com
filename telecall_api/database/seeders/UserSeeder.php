<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'email' => 'admin@admin.com',
                'customer_id' => 1,
                'role' => 0,
                'password' => Hash::make('123qwe'),
            ],
            [
                'email' => 'ali@admin.com',
                'customer_id' => 2,
                'role' => 1,
                'password' => Hash::make('123qwe'),
            ],
            [
                'email' => 'admin_patients@admin.com',
                'customer_id' => 1,
                'role' => 3,
                'password' => Hash::make('123qwe'),
            ],
            [
                'email' => 'ali_patients@admin.com',
                'customer_id' => 2,
                'role' => 3,
                'password' => Hash::make('123qwe'),
            ],
        ]);
    }
}
