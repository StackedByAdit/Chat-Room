import React, { useState } from 'react'
import MessageBox from './MessageBox'
import Messages from './Messages'
import { getSocket } from '../sockets/Socket'

export const MiddleComponent = () => {

  const [messages, setMessages] = useState<any[]>([]);
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);

  function joinRoom() {
    if (!roomId.trim()) return;

    const socket = getSocket();

    socket.send(JSON.stringify({
      type: "join",
      payload: { roomId }
    }));

    setJoined(true);
  }

  function addMessage(msg: any) {
    setMessages(prev => [...prev, msg]);
  }

  if (!joined) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f0f10",
        color: "white"
      }}>
        <div style={{
          display: "flex",
          gap: 10,
          padding: 20,
          borderRadius: 12,
          background: "#18181b",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
        }}>
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room code"
            style={{
              padding: 10,
              borderRadius: 8,
              border: "none",
              outline: "none",
              background: "#27272a",
              color: "white"
            }}
          />
          <button
            onClick={joinRoom}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              background: "#4f93ff",
              color: "white",
              cursor: "pointer"
            }}
          >
            Join
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      height: "100vh",
      width: "60%",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: "#0f0f10"
    }}>
      <Messages messages={messages} setMessages={setMessages} />
      <MessageBox addMessage={addMessage} />
    </div>
  )
}

export default MiddleComponent