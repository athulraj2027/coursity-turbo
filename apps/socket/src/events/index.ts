import type { Server, Socket } from "socket.io";
import producerEvents from "./producerEvents.js";
import consumerEvents from "./consumerEvents.js";
import roomEvents from "./roomEvents.js";
import transportEvents from "./transportEvents.js";
import chatEvents from "./chatEvents.js";

export default function events(io: Server, socket: Socket) {
  producerEvents(io, socket);
  consumerEvents(io, socket);
  roomEvents(io, socket);
  transportEvents(io, socket);
  chatEvents(io, socket);
}
