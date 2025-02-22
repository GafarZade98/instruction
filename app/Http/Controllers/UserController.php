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
        return response()->json(['messages' => Message::where('user_id', auth()->id())->where('target_id', $request->only('target_id'))->get()]);
    }
}
