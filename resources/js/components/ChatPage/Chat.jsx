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
    const messagesEndRef = useRef(null);

    useEffect(() => {
        window.Echo.channel("chat").listen("MessageSent", (e) => {
            setMessage(e.message);
        });
    }, []);

    useEffect(() => {
        if (receiverUserId) {
            handleGetMessages(receiverUserId);
        }
    }, [receiverUserId]);

    const handleGetMessages = async (id) => {
        try {
            const { data } = await axios.get(`/userMessages?target_id=${id}`);
            setMessages(data.messages);
        } catch (error) {
            console.log("Error while fetching messages for user:", error);
        }
    };

    console.log(messages, "messages");

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
                                        // FIXME: way to identify which is me and and who is receiver
                                        <MessageBox
                                            isSent={
                                                msg.user_id !== receiverUserId
                                            }
                                            // isReceived={
                                            //     msg.target_id === receiverUserId
                                            // }
                                            key={msg.id}
                                            // name={msg.user.name}
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
