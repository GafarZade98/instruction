import React, { useState } from "react";
import "./MessageInput.scss";
import axios from "axios";
import { Send } from "lucide-react";
import { useReceiverUserState } from "../../states/user.state";

const MessageInput = () => {
    const [text, setText] = useState("");
    const { receiverUserId } = useReceiverUserState();

    const sendMessage = async (e) => {
        e.preventDefault();
        // FIXME
        try {
            await axios.post("/messages", {
                message: text,
                // receiver_id: receiverUserId,
            });
            setText("");
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
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <button onClick={sendMessage} disabled={!text}>
                <Send
                    size={22}
                    color={text ? "var(--color-primary)" : "#44383D"}
                />
            </button>
        </form>
    );
};

export default MessageInput;
