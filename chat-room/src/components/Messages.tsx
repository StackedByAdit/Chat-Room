import React, { useEffect, useRef } from 'react';
import { getSocket } from './Socket';

type Message = {
  text: string;
  isMine: boolean;
};

const Messages = ({ messages, setMessages }: {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) => {

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket = getSocket();

    socket.onmessage = (e) => {
      setMessages(prev => [
        ...prev,
        { text: e.data, isMine: false }
      ]);
    };
  }, [setMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{
      height: "85%",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      overflowY: "auto",
      padding: 10
    }}>
      {messages.map((msg, i) => (
        <div key={i} style={{
          alignSelf: msg.isMine ? "flex-end" : "flex-start",
          background: msg.isMine ? "#4f93ff" : "#e5e5ea",
          color: msg.isMine ? "white" : "black",
          padding: "8px 12px",
          borderRadius: 12,
          maxWidth: "60%",
          wordBreak: "break-word"
        }}>
          {msg.text}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;