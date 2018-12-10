<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MainTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('main')->insert([
            'upload_time' => time(),
            'facebook_name' => str_random(10),
        ]);
        //
    }
}
