import React from "react";
import "./ContactItem.scss";

const ContactItem = ({ user_id, name }) => {
    return (
        <div>
            <div className={"contact_item"}>
                <img
                    src={"https://api.dicebear.com/7.x/bottts/svg?seed=" + user_id}
                    alt="avatar"
                    className={"contact_avatar"}
                />
                <div className={"contact_name"}>{name}</div>
            </div>
        </div>
    );
};

export default ContactItem;
