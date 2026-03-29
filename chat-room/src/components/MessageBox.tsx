import React, { useEffect, useRef, useState } from 'react'

export const MessageBox = () => {
  const inputMessage = useRef<HTMLInputElement | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  
  function handleInput() {
    if (!inputMessage.current) {
      return;
    }

    if (!inputMessage.current || !socket) return;

    console.log(inputMessage.current.value)

    const message = inputMessage.current?.value;
    socket.send(message);

  }


  useEffect(() => {
    const ws = new WebSocket("ws://localhost:6969");
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected");
    };

    ws.onmessage = (e) => {
      console.log("Received:", e.data);
    };

    ws.onclose = () => {
      console.log("Disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', gap: 10 }}>
        <input ref={inputMessage} style={{ padding: 10, borderRadius: 15, boxShadow: '2px 2px 5px red, -2px -2px 5px blue', width: "90%" }} type='text' placeholder='say Hello'></input>
        <button onClick={handleInput} style={{ padding: 1, borderRadius: 15, boxShadow: '2px 2px 5px red, -2px -2px 5px blue', width: "10%" }}>Send</button>
      </div>
    </div>
  )
}

export default MessageBox