import React, { useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar.jsx";
import MessageBox from "../MessageBox/MessageBox";
import Navbar from "../Navbar/Navbar";
import "./ChatPage.scss";
import MessageInput from "../MessageInput/MessageInput";
import NoChatSelected from "../NoChatSelected/NoChatSelected";
import {
    useMessagesState,
    useReceiverUserState,
} from "../../states/user.state";
import NoMessages from "../NoMessages/NoMessages";

export default function Chat() {
    const { messages, setMessages, setMessage } = useMessagesState();
    const { receiverUserId } = useReceiverUserState();
    const authId = document.getElementById("chat").dataset.authId;

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!receiverUserId) return;

        const channel = window.Echo.channel(`chat`);

        channel.listen("MessageSent", (e) => {
            setMessage(e.message);
        });

        return () => {
            channel.stopListening("MessageSent");
        };
    }, [receiverUserId]);

    useEffect(() => {
        if (receiverUserId) {
            handleGetMessages(receiverUserId);
        }
    }, [receiverUserId]);

    const handleGetMessages = async (id) => {
        try {
            const { data } = await axios.get(`/userMessages?receiver_id=${id}`);
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
                        {!receiverUserId ? (
                            <NoChatSelected />
                        ) : messages.length > 0 ? (
                            <div className="messages_list">
                                {messages
                                    .sort((a, b) => a.id - b.id)
                                    .map(
                                        ({
                                            id,
                                            sender_id,
                                            message,
                                            created_at,
                                        }) => (
                                            <MessageBox
                                                key={id}
                                                isSent={
                                                    sender_id !== receiverUserId
                                                }
                                                sender_id={sender_id}
                                                message={message}
                                                time={created_at}
                                            />
                                        ),
                                    )}
                                <div ref={messagesEndRef} />
                            </div>
                        ) : (
                            <NoMessages />
                        )}

                        {receiverUserId && <MessageInput />}
                    </div>
                </div>
            </div>
        </div>
    );
}
