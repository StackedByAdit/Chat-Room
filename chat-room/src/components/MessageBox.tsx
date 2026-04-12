import React, { useRef } from 'react';
import type { Message } from '../types';

type Props = {
  socket: WebSocket | null;
  addMessage: (msg: Message) => void;
};

const MessageBox = ({ socket, addMessage }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sendMessage = () => {
    if (!inputRef.current || !socket) return;

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
    <div style={{ display: 'flex', gap: 12, padding: 10 }}>
      <input
        ref={inputRef}
        style={{ padding: 10, borderRadius: 15, width: "90%" }}
        placeholder="Say hello to Strangers..."
      />
      <button onClick={sendMessage} style={{ width: "10%" }}>
        Send
      </button>
    </div>
  );
};

export default MessageBox;