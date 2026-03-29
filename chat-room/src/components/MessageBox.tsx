import React, { useEffect, useRef, useState } from 'react'
import { getSocket } from './Socket';

export const MessageBox = ({ addMessage }: any) => {
  const inputMessage = useRef<HTMLInputElement | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  function handleInput() {
    if (!inputMessage.current || !socket) return;

    const message = inputMessage.current.value;
    if (!message.trim()) return;

    addMessage({
      text: message,
      isMine: true
    });

    socket.send(JSON.stringify({
      type: "chat",
      payload: {
        message: message
      }
    }));

    inputMessage.current.value = "";
  }

  useEffect(() => {
    const socketInstance = getSocket();
    setSocket(socketInstance);

    socketInstance.onopen = () => {
      socketInstance.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "room1"
        }
      }));
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
            width: "90%"
          }}
          type='text'
          placeholder='say Hello'
        />

        <button onClick={handleInput} style={{ width: "10%" }}>
          Send
        </button>
      </div>
    </div>
  )
}

export default MessageBox