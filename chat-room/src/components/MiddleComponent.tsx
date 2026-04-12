import React, { useEffect, useState } from 'react';
import MessageBox from './MessageBox';
import Messages from './Messages';
import type { Message } from '../types';
import { createSocket } from '../sockets/Socket';

export const MiddleComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = createSocket();
    setSocket(ws);

    ws.addEventListener("open", () => {
      console.log("CONNECTED");
      setIsConnected(true);
    });

    ws.addEventListener("message", (e) => {
      setMessages(prev => [
        ...prev,
        { text: e.data, isMine: false }
      ]);
    });

    return () => {
      ws.close();
    };
  }, []);

  function joinRoom() {
    if (!roomId.trim() || !socket) return;

    if (socket.readyState !== WebSocket.OPEN) {
      console.log("Socket not ready");
      return;
    }

    socket.send(JSON.stringify({
      type: "join",
      payload: { roomId }
    }));

    setJoined(true);
  }

  function addMessage(msg: Message) {
    setMessages(prev => [...prev, msg]);
  }

  if (!joined) {
    return (
      <div style={styles.joinContainer}>
        <div style={styles.joinBox}>
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room code"
            style={styles.input}
          />
          <button
            onClick={joinRoom}
            disabled={!isConnected}
            style={{
              ...styles.button,
              opacity: isConnected ? 1 : 0.5,
              cursor: isConnected ? "pointer" : "not-allowed"
            }}
          >
            {isConnected ? "Join" : "Connecting..."}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.chatContainer}>
      <Messages messages={messages} />
      <MessageBox socket={socket} addMessage={addMessage} />
    </div>
  );
};

export default MiddleComponent;

const styles = {
  joinContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f0f10",
    color: "white"
  },
  joinBox: {
    display: "flex",
    gap: 10,
    padding: 20,
    borderRadius: 12,
    background: "#18181b"
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#27272a",
    color: "white"
  },
  button: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "#4f93ff",
    color: "white"
  },
  chatContainer: {
    height: "100vh",
    width: "60%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "#0f0f10"
  }
};