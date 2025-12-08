import type { Server, Socket } from "socket.io";

export default function roomEvents(io: Server, socket: Socket) {
  // join room
  socket.on("join-room", async ({ user, roomId }, cb) => {
    console.log("Data received : ", user, roomId);
  });

  // disconnect room
  socket.on("disconnect", async () => {});

  // leave room
  socket.on("leave-room", () => {});
}
