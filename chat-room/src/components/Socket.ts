let socket: WebSocket | null = null;

export function getSocket() {
  if (!socket) {
    socket = new WebSocket("ws://localhost:6969");
  }
  return socket;
}