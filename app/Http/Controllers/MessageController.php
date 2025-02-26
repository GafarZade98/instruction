<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return Message::latest()->cursorPaginate(25);
    }

    public function store(Request $request)
    {
        $message = $request->user()->messages()->create([
            'message' => strip_tags($request->input('message')),
            'sender_id' => auth()->id(),
            'name' =>  auth()->user()->name
        ]);

        MessageSent::dispatch($message);

        return response()->json($message, 201);
    }
}
