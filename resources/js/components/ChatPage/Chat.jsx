import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import MessageBox from "../MessageBox/MessageBox";
import Navbar from "../Navbar/Navbar";
import "./ChatPage.scss";
import MessageInput from "../MessageInput/MessageInput";
import NoChatSelected from "../NoChatSelected/NoChatSelected";
import { useReceiverUserState } from "../../states/user.state";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const { receiverUserId } = useReceiverUserState();

    useEffect(() => {
        fetchMessages();
        window.Echo.channel("chat").listen("MessageSent", (e) => {
            setMessages((prev) => [e.message, ...prev]);
        });
    }, []);

    //FIX: i dont need all messages. i need to get messages when i click the contact from Sidebar
    const fetchMessages = async () => {
        try {
            const { data } = await axios.get("/messages");
            console.log(data, "messages");
            setMessages(data);
        } catch (error) {
            console.log("Error while fetching messages:", error);
        }
    };

    useEffect(() => {
        // Scroll to the bottom when messages update
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length, receiverUserId]);

    return (
        <div className={"layout"}>
            <div className={"container"}>
                <Navbar />
                <div className={"content"}>
                    <Sidebar />

                    <div className={"main"}>
                        {receiverUserId ? (
                            <div className={"messages_list"}>
                                {messages
                                    .filter((msg) => msg.user && msg.user.name)
                                    .sort((a, b) => a.id - b.id)
                                    .map((msg) => (
                                        // FIXME: way to identify which is me and and who is receiver
                                        <MessageBox
                                            isSent={msg.user.id === msg.user_id}
                                            isReceived={
                                                msg.user.id === msg.target_id
                                            }
                                            key={msg.id}
                                            name={msg.user.name}
                                            message={msg.message}
                                            time={msg.created_at}
                                        />
                                    ))}
                                <div ref={messagesEndRef} />
                            </div>
                        ) : (
                            <NoChatSelected />
                        )}

                        <MessageInput />
                    </div>
                </div>
            </div>
        </div>
    );
}
