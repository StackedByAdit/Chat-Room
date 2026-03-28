import { WebSocketServer } from 'ws';

const PORT = 6969;
const wss = new WebSocketServer({port : PORT});

wss.on("connection", (socket) => {
    socket.send("Server Connected")
})

wss.on("message", (socket) => {
    socket.send()
})