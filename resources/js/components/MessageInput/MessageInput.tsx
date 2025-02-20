import React, { useState } from "react";
import "./MessageInput.scss";
import axios from "axios";
import { Send } from "lucide-react";

const MessageInput = () => {
    const [message, setMessage] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/messages", { message });
            setMessage("");
        } catch (error) {
            console.log("Error while sending message:", error);
        }
    };

    return (
        <form action="" className={"form_group"}>
            <div className={"input_wrapper"}>
                <input
                    type="text"
                    name="message"
                    className={"input"}
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <button
                onClick={sendMessage}
                disabled={!message}
                className={"submit_btn"}
            >
                <Send
                    size={22}
                    color={message ? "var(--color-primary)" : "#44383D"}
                />
            </button>
        </form>
    );
};

export default MessageInput;
