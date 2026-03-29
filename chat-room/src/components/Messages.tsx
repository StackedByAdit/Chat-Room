import React, { useEffect, useState } from 'react'
import { getSocket } from './Socket';

interface Message {
    text: string;
    isMine: boolean;
}

const Messages = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const socket = getSocket();

        socket.onmessage = (e) => {
            const incoming = e.data;

            setMessages(prev => [
                ...prev,
                { text: incoming, isMine: false }
            ]);
        };

    }, []);

    return (
        <div style={{
            height: "65%",
            padding: 10,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            overflowY: "auto"
        }}>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    style={{
                        alignSelf: msg.isMine ? "flex-end" : "flex-start",
                        backgroundColor: msg.isMine ? "#4f93ff" : "#e5e5ea",
                        color: msg.isMine ? "white" : "black",
                        padding: "8px 12px",
                        borderRadius: 12,
                        maxWidth: "60%",
                        wordBreak: "break-word"
                    }}
                >
                    {msg.text}
                </div>
            ))}
        </div>
    )
}

export default Messages