import React from "react";
import { MessageSquare } from "lucide-react";
import "./NoMessages.scss";

const NoMessages = () => {
    return (
        <div className="placeholder_container">
            <div className="logo_container">
                <MessageSquare color={"var(--color-primary)"} size={30} />
            </div>
            <h2 className="title">Welcome to Chatty!</h2>
            <p className="subtitle">
                No messages yet. Say hello to start the conversation!
            </p>
        </div>
    );
};

export default NoMessages;
