import type { Server, Socket } from "socket.io";

export const handleSignalEvents = (io: Server, socket: Socket) => {
  // get rtpcapabilities
  socket.on("get-routerRtpCapabilities", async ({ roomId }, cb) => {});
  // create transport
  socket.on("createSendTransport", async ({ roomId }, cb) => {});

  // In handleSignalEvents.ts → at the very top, right after socket connection
  socket.on(
    "connectTransport",
    async ({ dtlsParameters, transportId, roomId }, callback) => {}
  );

  socket.on("createRecvTransport", async ({ roomId }, cb) => {});

  // produce
  socket.on(
    "produce",
    async ({ kind, rtpParameters, roomId, transportId, appData }, cb) => {}
  );

  // consume

  socket.on(
    "consume",
    async ({ roomId, producerId, rtpCapabilities }, cb) => {}
  );
};
