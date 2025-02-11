import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchMessages();
        window.Echo.channel('chat')
            .listen('MessageSent', (e) => {
                console.log(e.message)
                setMessages((prev) => [e.message, ...prev]);
            });
    }, []);

    const fetchMessages = async () => {
        const { data } = await axios.get('/messages');
        setMessages(data);
    };

    const sendMessage = async () => {
        await axios.post('/messages', { message });
        setMessage('');
    };

    return (
        <div>
            <div>
                {messages
                    .filter((msg) => msg.user && msg.user.name)
                    .map((msg) => (
                        <div key={msg.id}>
                            <strong>{msg.user.name}:</strong> {msg.message}
                        </div>
                    ))}
            </div>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
