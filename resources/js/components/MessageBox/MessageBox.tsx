import React from "react";
import "./MessageBox.scss";
import cn from "classnames";
import { formatMessageTime } from "../../utils/helper";

const MessageBox = ({ isSent, time, message, sender_id }: any) => {
    const formattedTime = formatMessageTime(time);

    return (
        <div
            className={cn("message_wrapper", {
                ["sent"]: isSent,
            })}
        >
            <img
                src={"https://api.dicebear.com/7.x/bottts/svg?seed=" + sender_id}
                alt="avatar"
                className={"contact_avatar"}
            />
            <div className={"message_box"}>
                <div className={"sent_time"}>{formattedTime}</div>
                <p className={"message_content"}>{message}</p>
            </div>
        </div>
    );
};

export default MessageBox;
