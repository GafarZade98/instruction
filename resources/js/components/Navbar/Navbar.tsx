import React from "react";
import { Users } from "lucide-react";
import "./Navbar.scss";
import { useReceiverUserState } from "../../states/user.state";

const Navbar = () => {
    const { receiverUserName } = useReceiverUserState();

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
                            "https://avatar.iran.liara.run/public/boy?username=" +
                            receiverUserName
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
