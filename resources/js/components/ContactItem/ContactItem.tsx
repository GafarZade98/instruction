import React, { useEffect, useState } from "react";
import "./ContactItem.scss";
import axios from "axios";

const ContactItem = ({ name }) => {
    const [userImage, setUserImage] = useState("");

    const access_key = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

    const fetchRandomImage = async () => {
        try {
            const { data } = await axios.get(
                `https://api.unsplash.com/photos/random?query=monkey&client_id=${access_key}`,
            );
            setUserImage(data.urls.small);
        } catch (error) {
            console.log("Error while fetching random image:", error);
        }
    };

    useEffect(() => {
        // fetchRandomImage();
    }, []);

    return (
        <div>
            <div className={"contact_item"}>
                <img
                    src={userImage}
                    alt="avatar"
                    className={"contact_avatar"}
                />
                <div className={"contact_name"}>{name}</div>
            </div>
        </div>
    );
};

export default ContactItem;
