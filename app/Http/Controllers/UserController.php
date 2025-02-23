<?php

namespace App\Http\Controllers;

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
        $target_id = $request->input('target_id');
        return response()->json([
            'messages' => auth()->user()->messages()
                ->where(function ($query) use ($target_id) {
                    $query->where('target_id', $target_id)
                        ->orWhere('user_id', $target_id);
                })
                ->get(),
            'user' => User::where('id', $target_id)->get()
        ]);
    }
}
