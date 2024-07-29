import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import cookieParser from "cookie-parser";
import { initSocket } from "./connection/socket.js";
import { sequelize } from "./db/database.js";
const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
  credentials: true, // allow the access-control-allow-credentials
  //서버에서 Response 반응을 보낼 때 헤더를 포함해야 브라우저가 서버로부터 응답을 받았을 떄 헤더가 있음을 인식하고 정보가 안전해 클라이언트에 자바스크립코드로 전달해도 괜찮음을 인식하고 서버에서 받은 body를 클라이언트에게 보내줄 수 있다.
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

sequelize.sync().then(() => {
  console.log(`server started...${new Date()}`);
  const server = app.listen(config.port);
  initSocket(server);
});

// const socketIO = new Server(server, { cors: { origin: "*" } });

// socketIO.on("connection", (socket) => {
//   console.log("client here!");
//   socketIO.emit("dwitter", "hello");
// });
