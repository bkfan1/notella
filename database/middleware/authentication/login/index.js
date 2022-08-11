import connection from "../../../connection";
import Account from "../../../models/account";
import { compare } from "bcrypt";
import { serialize } from "cookie";
import { createToken } from "../token";
import { email } from "../../../../utils/regex";

export const handleLogin = async (req, res) => {
  const { body } = req;

  if (!body.email || !body.password) {
    return res
      .status(400)
      .json({ message: "You need to provide an email and password." });
  }

  if (!email.test(body.email)) {
    return res.status(400).json({ message: "Invalid email."});
  }

  if(body.password.length < 8){return res.status(400).json({message:'Password needs to be at least 8 characters long.'})}

  const db = await connection();
  const user = await Account.findOne({ email: body.email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "Account with that email dont exists." });
  }

  compare(body.password, user.password, async (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Server error, please try again." });
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
          sameSite: process.env.NODE_ENV === "development" ? 'strict' : 'lax',
          maxAge: 86400,
          path: "/",
        })
      );

      return res.status(200).json({ message: "Logged sucessfully." });
    }

    return res.status(400).json({ message: "Wrong password." });
  });
};
