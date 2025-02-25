import React from "react";
import cn from "classnames";
import "./ContactItem.scss";
import { useReceiverUserState } from "../../states/user.state";

const ContactItem = ({ user_id, name }) => {
    const { setReceiverUserId, setReceiverUserName, receiverUserId } =
        useReceiverUserState();

    const handleGetMessages = (id, name) => {
        setReceiverUserId(id);
        setReceiverUserName(name);
    };

    return (
        <div
            className={cn("contact_item", {
                ["active"]: receiverUserId === user_id,
            })}
            onClick={() => handleGetMessages(user_id, name)}
        >
            <img
                src={"https://avatar.iran.liara.run/public/" + user_id}
                alt="avatar"
                className={"contact_avatar"}
            />
            <div className={"contact_name"}>{name}</div>
        </div>
    );
};

export default ContactItem;
