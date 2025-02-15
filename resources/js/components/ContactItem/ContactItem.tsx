import React from "react";
import "./ContactItem.scss";

const ContactItem = () => {
    return (
        <div>
            <div className={"contact_item"}>
                <img
                    src="./avatar.png"
                    alt="avatar"
                    className={"contact_avatar"}
                />
                <div className={"contact_name"}>Fidan Ismayilova</div>
            </div>
        </div>
    );
};

export default ContactItem;
