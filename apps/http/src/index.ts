import dotenv from "dotenv";
import "dotenv/config";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

// 1️⃣ Load shared env (root)
dotenv.config();

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// 2️⃣ Load db env (if you keep it separate)
dotenv.config({ path: path.resolve(__dirname, "../../../packages/db/.env") });

import express from "express";

import v1Routes from "./routes/v1/index";
const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: ["http://localhost:3000"], // your Next.js frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // if you plan to send cookies or auth headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", v1Routes);

app.listen(PORT, () => console.log("Server started running at port : ", PORT));
