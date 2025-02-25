import React from "react";
import cn from "classnames";
import "./ContactItem.scss";
import { useReceiverUserState } from "../../states/user.state";

const ContactItem = ({ sender_id, name }) => {
    const { setReceiverUserId, setReceiverUserName, receiverUserId } =
        useReceiverUserState();

    const handleGetMessages = (id, name) => {
        setReceiverUserId(id);
        setReceiverUserName(name);
    };

    return (
        <div
            className={cn("contact_item", {
                ["active"]: receiverUserId === sender_id,
            })}
            onClick={() => handleGetMessages(sender_id, name)}
        >
            <img
                src={"https://api.dicebear.com/7.x/bottts/svg?seed=" + sender_id}
                alt="avatar"
                className={"contact_avatar"}
            />
            <div className={"contact_name"}>{name}</div>
        </div>
    );
};

export default ContactItem;
