<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageEvent;
use App\Http\Controllers\Controller;
use Event;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function message(Request $request){
        event(new MessageEvent($request->input("username"), $request->input("message")));
        return [];
    }
}
