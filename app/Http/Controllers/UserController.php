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
        $receiver_id = $request->input('receiver_id');
        return response()->json([
            'messages' => Message::query()
                ->where(function ($query) use ($receiver_id) {
                    $query->where('sender_id', auth()->id())
                        ->where('receiver_id', $receiver_id)
                        ->orWhere(function ($query) use ($receiver_id) {
                            $query->where('sender_id', $receiver_id)
                                ->where('receiver_id', auth()->id());
                        });
                })
                ->get(),
            'user' => User::where('id', $receiver_id)->first()
        ]);
    }
}
