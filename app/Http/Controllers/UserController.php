<?php

namespace App\Http\Controllers;

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
        dd(auth()->user()->messages());
        return auth()->user()->messages()->where('target_id', $request->get('target_id'))->get();
    }
}
