import React, { useEffect, useState } from 'react'
import { getSocket } from './Socket';

const Messages = () => {
    const [displayMessages, setdisplayMessages] = useState<string[]>([]);

    useEffect(() => {
        const socket = getSocket();

        socket.onmessage = (e) => {
            console.log("Received:", e.data);
            setdisplayMessages(prev => [...prev, e.data]);
        };

    }, []);

    return (
        <div style={{ height: "65%", color: "white" }}>
            <div
                style={{
                    padding: 10,
                    width: 100,
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    color: "black"
                }}
            >
                {displayMessages.map((m, index) => (
                    <div key={index}>
                        {m}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Messages