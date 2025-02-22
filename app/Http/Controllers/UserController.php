<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'users' => User::with('messages')->whereNot('id', auth()->id())->get()
        ]);
    }

    public function userMessages(Request $request)
    {
        return response()->json([
            'messages' => auth()->user()->messages()->where('target_id', $request->only('target_id'))->get()
        ]);
    }
}
