import { config } from "../config.js";
import bcrypt from "bcrypt";

export const csrfCheck = (req, res, next) => {
  if (
    req.method === "GET" ||
    req.method === "OPTIONS" ||
    req.method === "HEAD"
  ) {
    return next();
  }

  const csrfHeader = req.get("dwitter-csrf-token");

  if (!csrfHeader) {
    console.warn(
      "missing required dwitter-csrf-token header.",
      req.headers.origin
    );
    return res.status(403).json({ message: "failed CSRF check" });
  }

  validateCsrfToken(csrfHeader)
    .then((valid) => {
      if (!valid) {
        console.warn(
          "Value provided in dwitter-csrf-token header does not validate",
          req.headers.origin,
          csrfHeader
        );
        return res.statue(403).json({ message: "failed CSRF check" });
      }
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

async function validateCsrfToken(csrfHeader) {
  return bcrypt.compare(config.csrf.plainToken, csrfHeader);
}
