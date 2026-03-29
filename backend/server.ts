import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 6969 });

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log("Received from client:", message.toString());
    console.log("test");

    socket.send(message.toString());
  });
});