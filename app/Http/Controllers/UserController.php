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
        $target_id = $request->input('target_id');
        return response()->json([
            'messages' => Message::query()
                ->where(function ($query) use ($target_id) {
                    $query->where('user_id', auth()->id())
                        ->where('target_id', $target_id)
                        ->orWhere(function ($query) use ($target_id) {
                            $query->where('user_id', $target_id)
                                ->where('target_id', auth()->id());
                        });
                })
                ->get(),
            'user' => User::where('id', $target_id)->get()
        ]);
    }
}
