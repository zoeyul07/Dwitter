import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.statue(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    "c48336e43f65f04d1dc67df45c4b217eff6ac19da0875f5d929d3f37ca1873cac428e5de573a97494e5d3d50e13b0ae8beca1e7ba5081647e98b0c79b62f2b99",
    async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        return res.status(401), json(AUTH_ERROR);
      }
      //다른콜백함수에서 동일하게 등록해야하는 데이터라면 하단과 같이 등록 가능
      req.userId = user.id; //req.customData
      next();
    }
  );
};
