import React from "react";
import { MessageSquare } from "lucide-react";

import "./NoChatSelected.scss";

const NoChatSelected = () => {
    return (
        <div className="placeholder_container">
            <div className="logo_container">
                <MessageSquare color={"var(--color-primary)"} size={30} />
            </div>
            <h2 className="title">Welcome to Chatty!</h2>
            <p className="subtitle">
                Select a conversation from the sidebar to start chatting
            </p>
        </div>
    );
};

export default NoChatSelected;
