import { parse } from "cookie";
import { sign, verify } from "jsonwebtoken";

export const createToken = (claims, secret, options) => {
  if (!claims) {
    throw Error("No claims were provided.");
  }
  if (!secret) {
    throw Error("No secret were provided.");
  }

  const jwt = sign(claims, secret, options);
  return jwt;
};

export const verifyToken = async (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie) {
    return res.status(403).json({});
  }

  const parsedCookie = parse(cookie);
  const { authToken } = parsedCookie;
  verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({});
    }
    const { userId } = decoded;
    next(req, res, userId);
  });
  return;
};
