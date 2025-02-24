import React from "react";
import "./MessageBox.scss";
import cn from "classnames";

const MessageBox = ({ isSent, time, message, user_id }: any) => {
    const date = new Date(time);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    return (
        <div
            className={cn("message_wrapper", {
                ["sent"]: isSent,
                // ["received"]: !isSent,
            })}
        >
            <img
                src={"https://api.dicebear.com/7.x/bottts/svg?seed="  + user_id}
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
