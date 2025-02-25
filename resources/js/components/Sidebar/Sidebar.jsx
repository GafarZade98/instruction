import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import ContactItem from "../ContactItem/ContactItem.jsx";
import axios from "axios";

const Sidebar = () => {
    const [usersList, setUsersList] = useState([]);

    const handleFetchUsers = async () => {
        try {
            const { data } = await axios.get("/users");
            setUsersList(data.users);
        } catch (error) {
            console.log("Error while fetching users:", error);
        }
    };

    useEffect(() => {
        handleFetchUsers();
    }, []);

    return (
        <aside className={"sidebar"}>
            {usersList.map((user) => {
                return (
                    <ContactItem
                        sender_id={user.id}
                        name={user.name}
                        key={user.id}
                    />
                );
            })}
        </aside>
    );
};

export default Sidebar;
