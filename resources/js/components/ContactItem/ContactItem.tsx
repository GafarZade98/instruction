import React from "react";
import "./ContactItem.scss";

const ContactItem = ({ user_id, name }) => {
    return (
        <div>
            <div className={"contact_item"}>
                <img
                    src={"https://avatar.iran.liara.run/public/" + user_id}
                    alt="avatar"
                    className={"contact_avatar"}
                />
                <div className={"contact_name"}>{name}</div>
            </div>
        </div>
    );
};

export default ContactItem;
