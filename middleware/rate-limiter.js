import rateLimit from "express-rate-limit";
import { config } from "../config.js";

export default rateLimit({
  //millisecond
  windowMs: config.rateLimit.windowMs,
  //ip 별
  max: config.rateLimit.maxRequest,
  //dwitter 안에 들어오는 요청 갯수 설정
  //global
  keyGenerator: () => "dwitter",
});
