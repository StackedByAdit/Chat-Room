import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 6969 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {

  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());

    if (parsedMessage.type === "join") {
      const roomId = parsedMessage.payload.roomId;

      allSockets = allSockets.filter(user => user.socket !== socket);

      allSockets.push({
        socket,
        room: roomId
      });

      console.log("User joined room:", roomId);
    }

    if (parsedMessage.type === "chat") {

      const sender = allSockets.find(user => user.socket === socket);
      if (!sender) return;

      const messageText = parsedMessage.payload.message;

      console.log("Broadcasting:", messageText);

      allSockets.forEach(user => {
        if (
          user.room === sender.room &&
          user.socket.readyState === WebSocket.OPEN
        ) {
          user.socket.send(messageText);
        }
      });
    }
  });

  socket.on("close", () => {
    allSockets = allSockets.filter(user => user.socket !== socket);
    console.log("User disconnected");
  });
});