import React, { useState, useEffect } from 'react'

const Messages = () => {
    const [displayMessages, setdisplayMessages] = useState<string[]>([])

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:6969");

        ws.onopen = () => {
            console.log("Connected");
        };

        ws.onmessage = (e) => {
            console.log("Received:", e.data);
            setdisplayMessages(m => [...m, e.data])

        };

        ws.onclose = () => {
            console.log("Disconnected");
        };

        return () => {
            ws.close();
        };
    }, []);



    return (
        <div style={{ height: "65%", color: "white" }}>
            <div style={{padding : 10, width:100, display:"flex", flexDirection:"column", backgroundColor:"white", color:"black"}}>
                {displayMessages.map(m => <div>
                    {m}
                </div>)}
            </div>
        </div>
    )
}

export default Messages
