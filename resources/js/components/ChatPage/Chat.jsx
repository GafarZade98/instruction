import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import MessageBox from "../MessageBox/MessageBox";
import Navbar from "../Navbar/Navbar";
import "./ChatPage.scss";
import MessageInput from "../MessageInput/MessageInput";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();
        window.Echo.channel("chat").listen("MessageSent", (e) => {
            setMessages((prev) => [e.message, ...prev]);
        });
    }, []);

    const fetchMessages = async () => {
        try {
            const { data } = await axios.get("/messages");
            setMessages(data);
        } catch (error) {
            console.log("Error while fetching messages:", error);
        }
    };

    useEffect(() => {
        // Scroll to the bottom when messages update
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    return (
        <div className={"layout"}>
            <div className={"container"}>
                <Navbar />
                <div className={"content"}>
                    <Sidebar />

                    <div className={"main"}>
                        <div className={"messages_list"}>
                            {messages
                                .filter((msg) => msg.user && msg.user.name)
                                .sort((a, b) => a.id - b.id)
                                .map((msg) => (
                                    // FIXME: way to identify which is me and and who is receiver
                                    <MessageBox
                                        isSent={msg.user.id === 2}
                                        isReceived={msg.user.id === 1}
                                        key={msg.id}
                                        name={msg.user.name}
                                        message={msg.message}
                                        time={msg.created_at}
                                    />
                                ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <MessageInput />
                    </div>
                </div>
            </div>
        </div>
    );
}
