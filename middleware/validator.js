import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  //에러가 없으면 다음 미들웨어로 넘어가고 아니면 에러 발생
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ message: errors.array()[0].msg });
};
