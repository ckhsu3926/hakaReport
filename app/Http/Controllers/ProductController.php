<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getList(){
        return response(["aaa,bbb"]);
    }

    public function getLogFile($type,$id){
        return response()->json([
            'timestamp' => $type,
            'facebook_name' => $id
        ]);
    }

    public function reportLogFile(Request $request){
        $validate = $request->validate([
          'timestamp' => 'required',
          'name' => 'required',
          'component' => 'required',
          'setup' => 'required'
        ]);
        return response(var_dump($request->component));
    }
}
