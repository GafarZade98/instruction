import React, { useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar.jsx";
import MessageBox from "../MessageBox/MessageBox";
import "./ChatPage.scss";
import MessageInput from "../MessageInput/MessageInput";
import { useMessagesState } from "../../states/user.state";
import NoMessages from "../NoMessages/NoMessages";

export default function Chat() {
    const { messages, setMessages, setMessage } = useMessagesState();
    const authId = document.getElementById("chat").dataset.authId;

    const messagesEndRef = useRef(null);

    useEffect(() => {
        const channel = window.Echo.channel(`chat`);

        channel.listen("MessageSent", (e) => {
            setMessage(e.message);
        });

        return () => {
            channel.stopListening("MessageSent");
        };
    }, []);

    useEffect(() => {
        handleGetMessages();
    }, []);

    const handleGetMessages = async (id) => {
        try {
            const { data } = await axios.get(`/messages`);
            if (data.data) {
                setMessages(data.data);
            }
        } catch (error) {
            console.log("Error while fetching messages:", error);
        }
    };
    console.log(messages, "messages");

    useEffect(() => {
        // Scroll to the bottom when messages update
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    return (
        <div className={"layout"}>
            <div className={"container"}>
                <div className={"content"}>
                    {/* <Sidebar /> */}

                    <div className={"main"}>
                        {messages.length > 0 ? (
                            <div className="messages_list">
                                {messages
                                    .sort((a, b) => a.id - b.id)
                                    .map(
                                        ({
                                            id,
                                            sender_id,
                                            message,
                                            created_at,
                                            name,
                                        }) => (
                                            <MessageBox
                                                key={id}
                                                isSent={
                                                    sender_id === Number(authId)
                                                }
                                                sender_id={sender_id}
                                                message={message}
                                                time={created_at}
                                                name={name}
                                            />
                                        ),
                                    )}
                                <div ref={messagesEndRef} />
                            </div>
                        ) : (
                            <NoMessages />
                        )}

                        <MessageInput />
                    </div>
                </div>
            </div>
        </div>
    );
}
