<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function index()
    {
        return Message::with('user')->latest()->take(10)->get();
    }

    public function store(Request $request)
    {
        $message = auth()->user()->messages()->create([
            'message' => $request->input('message'),
            'user_id' => auth()->id(),
        ]);

//        broadcast(new MessageSent($message))->toOthers();
        MessageSent::dispatch($message);
        return response()->json($message, 201);
    }
}
