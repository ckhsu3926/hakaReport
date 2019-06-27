<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ApiController extends Controller
{
    /**
     * @return all report with json
     */
    public function getList(){
        return response()->json(DB::table("main")->select("date","name")->get());
    }

    /**
     * @param string $type "component" or "setup"
     * @param integer $date uplaod timestamp
     *
     * @return not found or file content
     */
    public function getLogFile(Request $request){
        $validate = $request->validate([
          'type' => 'required|string',
          'date' => 'required|integer'
        ]);

        $result=DB::table("main")->where("date",$request->date)->first();
        if($result)
        {
            return response($result->{$request->type});
        }
        echo"<script>alert('Not Found!');</script>";
        return redirect("/");
    }

    /**
     * @param string $input_content
     *
     * @return checked input_content
     */
    private function detectAndConvertEncoding(String $input_content){
        $originEncoding = mb_detect_encoding($input_content,"BIG-5,UTF-8,GB18030");
        if($originEncoding !== "UTF-8"){
            return mb_convert_encoding($input_content,"UTF-8",$originEncoding);
        }else{
            return $input_content;
        }
    }

    /**
     * @param string $name 
     * @param file $component hakamod_components.log
     * @param file $setup hakamod_setup.log
     *
     * @return error file type or 200
     */
    public function reportLogFile(Request $request){
        $validate = $request->validate([
          'name' => 'required|string',
          'component' => 'required|file',
          'setup' => 'required|file'
        ]);

        if( Str::lower($request->file("component")->getClientOriginalName()) !== "hakamod_components.log"){
          return response()->json([
            "status"=>"404",
            "type"=>"component"
          ]);
        }
        if( Str::lower($request->file("setup")->getClientOriginalName()) !== "hakamod_setup.log"){
          return response()->json([
            "status"=>"404",
            "type"=>"setup"
          ]);
        }

        #date_default_timezone_set("Asia/Taipei");
        $primary_key = time();
        $content_setup = $this->detectAndConvertEncoding($request->file("setup")->get());
        $content_component = $this->detectAndConvertEncoding($request->file("component")->get());
        DB::table("main")->insert([
          "date"=>$primary_key,
          "name"=>$request->name,
          "setup"=>$content_setup,
          "component"=>$content_component
        ]);
        return response()->json([
            "status"=>"200",
            "date"=>$primary_key,
            "name"=>$request->name
        ]);
    }
}
