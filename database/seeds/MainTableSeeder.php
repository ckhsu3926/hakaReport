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
      for($a=0;$a<5;$a++){
        DB::table('main')->insert([
            'upload_time' => time()+$a,
            'facebook_name' => "test".$a,
        ]);
      }
        //
    }
}
