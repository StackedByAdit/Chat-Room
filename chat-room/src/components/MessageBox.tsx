import React, { useEffect, useRef } from 'react';
import { getSocket } from './Socket';

export const MessageBox = ({ addMessage }: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const socket = getSocket();

  useEffect(() => {
    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: "join",
        payload: { roomId: "room1" }
      }));
    };
  }, [socket]);

  const sendMessage = () => {
    if (!inputRef.current) return;

    const text = inputRef.current.value.trim();
    if (!text) return;

    addMessage({ text, isMine: true });

    socket.send(JSON.stringify({
      type: "chat",
      payload: { message: text }
    }));

    inputRef.current.value = "";
  };

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <input
        ref={inputRef}
        style={{ padding: 10, borderRadius: 15, width: "90%" }}
        placeholder="Say hello..."
      />
      <button onClick={sendMessage} style={{ width: "10%" }}>
        Send
      </button>
    </div>
  );
};