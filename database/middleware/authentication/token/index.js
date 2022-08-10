import {parse} from "cookie";
import {sign, verify} from "jsonwebtoken";

export const createToken = (claims, secret, options)=>{

  const jwt = sign(claims, secret, options);
  return jwt;
}

export const verifyToken = async (req, res, next) => {
  const { cookie } = req.headers;

  if (cookie) {
    const parsedCookie = parse(cookie);
    const { authToken } = parsedCookie;
    verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{

        if(err){return res.status(403).json({});}
        const {userId} = decoded;
        next(req, res, userId);

    })
    return;
  }

  return res.status(403).json({});
  
};
