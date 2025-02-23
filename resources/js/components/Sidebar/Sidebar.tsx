import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import ContactItem from "../ContactItem/ContactItem";
import axios from "axios";
import { useReceiverUserState } from "../../states/user.state";

const Sidebar = () => {
    const [usersList, setUsersList] = useState([]);
    const { setReceiverUserId, setReceiverUserName } = useReceiverUserState();

    const handleFetchUsers = async () => {
        try {
            const { data } = await axios.get("/users");
            console.log(data, "get users");
            setUsersList((prev) => data.users);
        } catch (error) {
            console.log("Error while fetching users:", error);
        }
    };

    const handleGetMessages = (id, name) => {
        setReceiverUserId(id);
        setReceiverUserName(name);
    };

    useEffect(() => {
        handleFetchUsers();
    }, []);

    return (
        <div className={"sidebar"}>
            {usersList.map((user) => {
                return (
                    <div
                        key={user.id}
                        onClick={() => handleGetMessages(user.id, user.name)}
                    >
                        <ContactItem name={user.name} />
                    </div>
                );
            })}
        </div>
    );
};

export default Sidebar;
