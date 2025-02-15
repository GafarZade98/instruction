import React from "react";
import "./Sidebar.scss";
import ContactItem from "../ContactItem/ContactItem";

const Sidebar = () => {
    return (
        <div className={"sidebar"}>
            {/* FIXME: map data here */}
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
            <ContactItem />
        </div>
    );
};

export default Sidebar;
