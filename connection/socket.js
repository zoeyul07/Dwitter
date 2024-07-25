import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

//내부적으로만 사용하고 외부에서는 하단 initSocket을 사용하여 socket 사용시 인스턴스를 한번만 만들도록 한다.(싱글톤)
//typescript 사용시 private, static 등 이용 가능
class Socket {
  constructor(server) {
    this.io = new Server(server, { cors: { origin: "*" } });

    this.io.use((socket, next) => {
      const token = socket.handShake.auth.token;
      if (!token) {
        return next(newError("Authentication error"));
      }
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          return next(newError("Authentication error"));
        }
        next();
      });
    });

    this.io.on("connection", (socket) => {
      console.log("socket client connected");
    });
  }
}

let socket;

export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}

export function getSocketIO() {
  if (!socket) {
    throw new Error("please call init first");
  }
  return socket.io;
}
