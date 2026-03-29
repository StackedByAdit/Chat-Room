import React, { useEffect, useRef } from 'react'
import { getSocket } from './Socket';

const Messages = ({ messages, setMessages }: any) => {

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const socket = getSocket();

        socket.onmessage = (e) => {
            const incoming = e.data;

            setMessages((prev: any[]) => {

                if (
                    prev.length > 0 &&
                    prev[prev.length - 1].text === incoming &&
                    prev[prev.length - 1].isMine
                ) {
                    return prev;
                }

                return [...prev, { text: incoming, isMine: false }];
            });
        };

    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div
            style={{
                height: "85%",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                overflowY: "auto",
                padding: 10
            }}
        >
            {messages.map((msg: any, index: number) => (
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

            <div ref={bottomRef} />
        </div>
    )
}

export default Messages