<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return Message::with('user')->latest()->get();
    }

    public function store(Request $request)
    {
        $message = auth()->user()->messages()->create([
            'message' => $request->input('message'),
            'user_id' => auth()->id(),
            'target_id' => $request->get('target_id'),
        ]);

        MessageSent::dispatch($message->load('user'));
        return response()->json($message, 201);
    }
}
