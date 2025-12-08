import type { Server, Socket } from "socket.io";

export default function transportEvents(io: Server, socket: Socket) {
  // Get RTP capabilities
  socket.on("get-routerRtpCapabilities", async ({ roomId }, cb) => {});

  // Create  transport
  socket.on("createTransport", async ({ roomId, kind }, cb) => {});

  // Connect transport
  socket.on(
    "connectTransport",
    async ({ dtlsParameters, transportId, roomId }, callback) => {}
  );
}
