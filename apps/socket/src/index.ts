import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import events from "./events/index.js";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // later restrict to frontend URL
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  events(io, socket);
});

server.listen(3001, () => console.log("Socket server running on port 3001"));
