import Account from "../../database/models/account";
import { compare } from "bcrypt";
import connection from "../../database/connection";
import {sign} from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { body } = req;
      if (!body.email || !body.password) {
        return res.status(400).json({});
      }

      const db = await connection();

      const user = await Account.findOne({ email: body.email });

      if(!user){return res.status(400).json({})}

      const {_id, password} = user;

      compare(body.password, user.password, async (err, result) => {
        if (err) {
          return res.status(400).json({});
        }
        if (result) {
          const claims = { sub: "logged", userId: user._id };
          const secret = process.env.ACCESS_TOKEN_SECRET;
          const jwt = sign(claims, secret, { expiresIn: "24h" });

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

      break;

    default:
      res.status(400).json({});
      break;
  }
}
