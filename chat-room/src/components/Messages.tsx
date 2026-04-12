import React, { useEffect, useRef } from 'react';
import type { Message } from '../types';

type Props = {
  messages: Message[];
};

const Messages = ({ messages }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={styles.container}>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            alignSelf: msg.isMine ? "flex-end" : "flex-start",
            backgroundColor: msg.isMine ? "#547fc4" : "#d7d7e6",
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
  );
};

export default Messages;

const styles = {
  container: {
    height: "85%",
    display: "flex",
    flexDirection: "column",
    gap: 7,
    overflowY: "auto",
    padding: 10
  }
};