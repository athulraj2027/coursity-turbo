
import dotenv from "dotenv";
import "dotenv/config";
import path from "path";
// 1️⃣ Load shared env (root)
dotenv.config();

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// 2️⃣ Load db env (if you keep it separate)
dotenv.config({ path: path.resolve(__dirname, "../../../packages/db/.env") });

import express from "express";

import v1Routes from "./routes/v1/index";
const app = express();
const PORT = 4000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1Routes);

app.listen(PORT, () => console.log("Server started running at port : ", PORT));
