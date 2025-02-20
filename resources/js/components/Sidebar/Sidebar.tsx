import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import ContactItem from "../ContactItem/ContactItem";
import axios from "axios";

const Sidebar = () => {
    const [usersList, setUsersList] = useState([]);

    const handleFetchUsers = async () => {
        try {
            const { data } = await axios.get("/users");
            console.log(data);
            setUsersList((prev) => data.users);
        } catch (error) {
            console.log("Error while fetching users:", error);
        }
    };

    const handleGetMessages = async (id) => {
        console.log(id, "id");
        try {
            const { data } = await axios.get(`/userMessages?target_id=${id}`);
            console.log(data);
            // setUsersList((prev) => data.users);
        } catch (error) {
            console.log("Error while fetching messages for user:", error);
        }
    };

    console.log(usersList);

    useEffect(() => {
        handleFetchUsers();
    }, []);

    return (
        <div className={"sidebar"}>
            {usersList.map((user) => {
                return (
                    <div
                        key={user.id}
                        onClick={() => handleGetMessages(user.id)}
                    >
                        <ContactItem name={user.name} />
                    </div>
                );
            })}
        </div>
    );
};

export default Sidebar;
