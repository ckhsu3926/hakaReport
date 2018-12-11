<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function getList(){
        return response(DB::table("main")->get());
        #return response(DB::table("main")->where("upload_time","1544531060")->first()->facebook_name);
    }

    public function getLogFile($type,$id){
      if(Storage::exists($type."/".$id)){
        return Storage::download($type."/".$id) ;
      }
      echo"<script>alert('not find');</script>";
      return redirect("/");
    }

    public function reportLogFile(Request $request){
        $validate = $request->validate([
          'name' => 'required',
          'component' => 'required',
          'setup' => 'required'
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
        $request->file("component")->storeAs("component",$primary_key);
        $request->file("setup")->storeAs("setup",$primary_key);
        return response()->json([
            "status"=>"200"
          ]);
    }
}
