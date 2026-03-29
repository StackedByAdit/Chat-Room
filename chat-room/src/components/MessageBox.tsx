import React, { useEffect, useRef, useState } from 'react'
import { getSocket } from './Socket';

export const MessageBox = () => {
  const inputMessage = useRef<HTMLInputElement | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  function handleInput() {
    if (!inputMessage.current || !socket) return;

    const message = inputMessage.current.value;

    if (!message.trim()) return;

    console.log(message);

    socket.send(message);

    inputMessage.current.value = "";
  }

  useEffect(() => {
    const socketInstance = getSocket();
    setSocket(socketInstance);

    socketInstance.onopen = () => {
      console.log("Connected");
    };

    socketInstance.onclose = () => {
      console.log("Disconnected");
    };

  }, []);

  return (
    <div>
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          ref={inputMessage}
          style={{
            padding: 10,
            borderRadius: 15,
            boxShadow: '2px 2px 5px red, -2px -2px 5px blue',
            width: "90%"
          }}
          type='text'
          placeholder='say Hello'
        />

        <button
          onClick={handleInput}
          style={{
            padding: 1,
            borderRadius: 15,
            boxShadow: '2px 2px 5px red, -2px -2px 5px blue',
            width: "10%"
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default MessageBox