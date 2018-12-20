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
        return response()->json(DB::table("main")->get());
        #return response(DB::table("main")->where("upload_time","1544531060")->first()->facebook_name);
    }

    /**
     * @param string $type "component" or "setup"
     * @param integer $id uplaod timestamp
     *
     * @return download file
     */
    public function getLogFile(Request $request){
        $validate = $request->validate([
          'type' => 'required|string',
          'id' => 'required|integer'
        ]);
        if(Storage::exists($request->type."/".$request->id)){
          return Storage::download($request->type."/".$request->id,"hakaMOD_".ucfirst($request->type).".log");
        }
        echo"<script>alert('Not Found');</script>";
        return redirect("/");
    }

    /**
     * @param string $name 
     * @param file $component hakamod_components.log
     * @param file $setup hakamod_setup.log
     *
     * @return upload status
     */
    public function reportLogFile(Request $request){
        $validate = $request->validate([
          'name' => 'required|string',
          'component' => 'required|file',
          'setup' => 'required|file'
        ]);

        if(!Storage::files("component")){
          Storage::makeDirectory("component");
        }
        if(!Storage::files("setup")){
          Storage::makeDirectory("setup");
        }

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

        $primary_key = time();
        DB::table("main")->insert([
          "upload_time"=>$primary_key,
          "facebook_name"=>$request->name
        ]);
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
        Storage::put("setup/".$primary_key,$content_setup);
        Storage::put("conpnent/".$primary_key,$content_component);
        return response()->json([
            "status"=>"200"
          ]);
    }
}
