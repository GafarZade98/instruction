import React from "react";
import { Users } from "lucide-react";
import "./Navbar.scss";
import { useReceiverUserState } from "../../states/user.state";

const Navbar = () => {
    const { receiverUserName, receiverUserId } = useReceiverUserState();

    return (
        <div className={"navbar_custom"}>
            <div className={"nav_left"}>
                <Users color={"var(--color-primary)"} size={20} />
                <p>Contacts</p>
            </div>
            {receiverUserName && (
                <div className={"nav_right"}>
                    <img
                        src={
                            "https://api.dicebear.com/7.x/bottts/svg?seed=" +
                            receiverUserId
                        }
                        alt="avatar"
                        className={"contact_avatar"}
                    />
                    <div className={"contact_name"}>{receiverUserName}</div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
