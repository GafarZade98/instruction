import React, { useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import MessageBox from "../MessageBox/MessageBox";
import Navbar from "../Navbar/Navbar";
import "./ChatPage.scss";
import MessageInput from "../MessageInput/MessageInput";
import NoChatSelected from "../NoChatSelected/NoChatSelected";
import {
    useMessagesState,
    useReceiverUserState,
} from "../../states/user.state";

export default function Chat() {
    const { messages, setMessages, setMessage } = useMessagesState();
    const { receiverUserId } = useReceiverUserState();
    const authId = document.getElementById("chat").dataset.authId;

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!receiverUserId) return;

        const channel = window.Echo.channel(`chat-${receiverUserId}`);

        channel.listen("MessageSent", (e) => {
            setMessage(e.message);
        });
    }, [receiverUserId]);

    useEffect(() => {
        if (receiverUserId) {
            handleGetMessages(receiverUserId);
        }
    }, [receiverUserId, messages.length]);

    const handleGetMessages = async (id) => {
        try {
            const { data } = await axios.get(`/userMessages?target_id=${id}`);
            setMessages(data.messages);
        } catch (error) {
            console.log("Error while fetching messages for user:", error);
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
                                    .sort((a, b) => a.id - b.id)
                                    .map((msg) => (
                                        <MessageBox
                                            isSent={
                                                msg.user_id !== receiverUserId
                                            }
                                            key={msg.id}
                                            user_id={msg.user_id}
                                            message={msg.message}
                                            time={msg.created_at}
                                        />
                                    ))}
                                <div ref={messagesEndRef} />
                            </div>
                        ) : (
                            <NoChatSelected />
                        )}

                        {receiverUserId && <MessageInput />}
                    </div>
                </div>
            </div>
        </div>
    );
}
