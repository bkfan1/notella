import connection from "../../../connection";
import Account from "../../../models/account";
import { compare } from "bcrypt";
import { serialize } from "cookie";
import { createToken } from "../token";
import { email } from "../../../../utils/regex";

export const handleLogin = async (req, res) => {
  const { body } = req;

  if (!body.email) {
    return await res
      .status(400)
      .json({ message: "You need to provide an email." });
  }
  if (!body.password) {
    return await res
      .status(400)
      .json({ message: "You need to provide a password." });
  }

  if (!email.test(body.email)) {
    return await res.status(400).json({ message: "Invalid email." });
  }

  if (body.password.length < 8) {
    return await res
      .status(400)
      .json({ message: "Password has to be at least 8 characters long." });
  }

  const db = await connection();
  const user = await Account.findOne({ email: body.email });
  if (!user) {
    return await res
      .status(404)
      .json({ message: "Account with that email dont exists." });
  }

  compare(body.password, user.password, async (err, result) => {
    if (err) {
      return await res
        .status(500)
        .json({ message: "Server error, please try again." });
    }
    if (!result) {
      return res.status(400).json({ message: "Wrong password." });
    }

    const claims = { sub: "logged", userId: user._id };
    const options = { expiresIn: "24h" };

    const jwt = await createToken(
      claims,
      process.env.ACCESS_TOKEN_SECRET,
      options
    );

    const cookie = serialize("authToken", jwt, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie);

    return await res.status(200).json({ message: "Logged sucessfully." });
  });
};
