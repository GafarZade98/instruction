<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/messages', [\App\Http\Controllers\MessageController::class, 'index'])->middleware('auth');
Route::post('/messages', [\App\Http\Controllers\MessageController::class, 'store'])->middleware('auth');
