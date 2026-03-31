let socket: WebSocket | null = null;

export function createSocket() {
  if (!socket) {
    socket = new WebSocket("ws://localhost:6969");
  }
  return socket;
}