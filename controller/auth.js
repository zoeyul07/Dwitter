import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "express-async-errors";
import * as userRepository from "../data/auth.js";
import { config } from "../config.js";

export async function signup(req, res) {
  const { userName, password, name, email, url } = req.body;
  const found = await userRepository.findByUserName(userName);
  if (found) {
    return res.status(409).json({ message: `${userName} already exists` });
  }

  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    userName,
    password: hashed,
    name,
    email,
    url,
  });

  const token = createJwtToken(userId);
  //cookie header를 사용하면 브라우저 외 클라이언트는 사용할 수 없다.
  setToken(res, token);

  res.status(201).json({ token, userName });
}

export async function login(req, res) {
  const { userName, password } = req.body;
  const user = await userRepository.findByUserName(userName);
  //보안과 연결되어있어서 아이디가 잘못되었는지 패스워드가 잘못되었는지 상세하게 알려주지 않음
  if (!user) {
    return res.status(401).json({ message: "invalid user or password" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "invalid user or password" });
  }

  const token = createJwtToken(user.id);
  setToken(res, token);
  res.status(200).json({ token, userName });
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json({ token: req.token, userName: user.userName });
}

function setToken(res, token) {
  const options = {
    //브라우저에서 해당 토큰은 저장할 때 만료 시간 설정
    //토큰 새성 시간과 동일하게
    //millisecond
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    //클라이언트와 서버가 다른 ip이더라도 동작하도록
    sameSite: "none",
    secure: true,
  };
  res.cookie("token", token, options);
}
