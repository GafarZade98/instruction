@extends('layouts.app')
@section('content')
    @vite(['resources/scss/main.scss'])
    <div class="container">
        <div id="chat" data-auth-id="{{auth()->id()}}"></div>
    </div>
@endsection
