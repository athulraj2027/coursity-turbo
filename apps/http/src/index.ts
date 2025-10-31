import express from "express";
import v1Routes from "./routes/v1/index";
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", v1Routes);

app.listen(PORT, () => console.log("Server started running at port : ", PORT));
