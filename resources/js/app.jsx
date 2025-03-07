/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import "./bootstrap";
import "./echo.js";

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import Chat from "./components/ChatPage/Chat.jsx";
import "../scss/app.scss";

if (document.getElementById("chat")) {
    const root = ReactDOM.createRoot(document.getElementById("chat"));
    root.render(<Chat />);
}
