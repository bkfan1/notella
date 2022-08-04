import connection from "../../connection";
import Account from "../../models/account";
import { compare } from "bcrypt";
import { serialize } from "cookie";
import { createToken } from "../authentication/index";

export const handleLogin = async (req, res) => {
  const { body } = req;

  const db = await connection();
  const user = await Account.findOne({ email: body.email });
  if (!user) {
    return res.status(404).json({});
  }

  compare(body.password, user.password, async (err, result) => {
    if (err) {
      return res.status(500).json({});
    }
    if (result) {
      const claims = { sub: "logged", userId: user._id };
      const options = { expiresIn: "24h" };

      const jwt = createToken(claims, process.env.ACCESS_TOKEN_SECRET, options);

      res.setHeader(
        "Set-Cookie",
        serialize("authToken", jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 86400,
          path: "/",
        })
      );

      return res.status(200).json({});
    }
    
    return res.status(400).json({});
  });
};
