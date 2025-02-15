import React from "react";
import { Users } from "lucide-react";
import "./Navbar.scss";

const Navbar = () => {
    return (
        <div className={"navbar_custom"}>
            <div className={"nav_left"}>
                <Users color={"var(--color-secondary-light)"} size={20} />
                <p>Contacts</p>
            </div>
            <div className={"nav_right"}>
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

export default Navbar;
