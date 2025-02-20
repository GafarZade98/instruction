<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(['users' => User::with('messages')->get()]);
    }

    public function userMessages(Request $request)
    {
        $messages = Message::where('target_id', $request->get('target_id'))->where('user_id', auth()->id())->get();
        return response()->json(['messages' => $messages]);
    }
}
