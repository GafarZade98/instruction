<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return Message::with('user')
            ->where('sender_id', auth()->id())
            ->orWhere('receiver_id', auth()->id())
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $message = $request->user()->messages()->create([
            'message' => strip_tags($request->input('message')),
            'sender_id' => auth()->id(),
            'receiver_id' => $request->get('receiver_id'),
        ]);

        MessageSent::dispatch($message);

        return response()->json($message, 201);
    }
}
