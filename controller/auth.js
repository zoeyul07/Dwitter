import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "express-async-errors";
import * as userRepository from "../data/auth.js";

const jwtSecretKey =
  "c48336e43f65f04d1dc67df45c4b217eff6ac19da0875f5d929d3f37ca1873cac428e5de573a97494e5d3d50e13b0ae8beca1e7ba5081647e98b0c79b62f2b99";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

export async function signup(req, res) {
  const { userName, password, name, email, url } = req.body;
  const found = await userRepository.findByUserName(userName);
  if (found) {
    return res.status(409).json({ message: `${userName} already exists` });
  }

  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    userName,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
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
  res.status(200).json({ token, userName });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json({ token: req.token, username: user.username });
}
