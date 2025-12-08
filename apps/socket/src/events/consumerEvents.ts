import type { Server, Socket } from "socket.io";

export default function consumerEvents(io: Server, socket: Socket) {
  socket.on("getProducers", async ({ roomId }, cb) => {});

  // Consume media from another peer
  socket.on(
    "consume",
    async ({ roomId, producerId, rtpCapabilities }, cb) => {}
  );

  // Resume consumer
  socket.on("resumeConsumer", async ({ roomId, consumerId }, cb) => {});

  // Pause consumer
  socket.on("pauseConsumer", async ({ roomId, consumerId }, cb) => {});

  // Close consumer
  socket.on("closeConsumer", async ({ roomId, consumerId }, cb) => {});
}
