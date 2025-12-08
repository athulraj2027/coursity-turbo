import type { Server, Socket } from "socket.io";

export default function producerEvents(io: Server, socket: Socket) {
  socket.on("produce", () => {});
}
