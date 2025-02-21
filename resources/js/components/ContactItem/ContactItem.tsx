import "./ContactItem.scss";

const ContactItem = ({ name }) => {

    return (
        <div>
            <div className={"contact_item"}>
                <img
                    src={"https://avatar.iran.liara.run/public/boy?username=" + name}
                    alt="avatar"
                    className={"contact_avatar"}
                />
                <div className={"contact_name"}>{name}</div>
            </div>
        </div>
    );
};

export default ContactItem;
