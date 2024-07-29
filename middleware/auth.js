import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";
import { config } from "../config.js";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  //1.cookie(for browser)
  //2. header (for Non-browser client)  쿠카 사용하지 않음

  let token;
  //check header first

  const authHeader = req.get("authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    token = authHeader.split(" ")[1];
  }

  //no token in header, check cookie
  if (!token) {
    token = req.cookies["token"];
  }

  //header와 cooke에 토큰이 없을 때
  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    //다른콜백함수에서 동일하게 등록해야하는 데이터라면 하단과 같이 등록 가능
    req.userId = user.id; //req.customData
    req.token = token;
    next();
  });
};
