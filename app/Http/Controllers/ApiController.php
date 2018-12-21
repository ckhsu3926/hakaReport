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
        return response()->json(DB::table("main")->get()->reverse()->values());
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

        $result=DB::table("main")->where("upload_time",$request->date)->first();
        if($result)
        {
            return response($result->{$request->type});
        }
        echo"<script>alert('Not Found!');</script>";
        return redirect("/");
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
        $primary_key = date("YmdHis");
        $content_setup = $request->file("setup")->get();
        $content_component = $request->file("component")->get();
        if( mb_detect_encoding($content_setup,"BIG-5,UTF-8")==="BIG-5" )
        {
            $content_setup = mb_convert_encoding($content_setup,"UTF-8","BIG-5");
        }
        if( mb_detect_encoding($content_component,"BIG-5,UTF-8")==="BIG-5" )
        {
            $content_component = mb_convert_encoding($content_component,"UTF-8","BIG-5");
        }
        DB::table("main")->insert([
          "date"=>$primary_key,
          "name"=>$request->name,
          "setup"=>$content_setup,
          "component"=>$content_component
        ]);
        return response()->json([
            "status"=>"200"
        ]);
    }
}
