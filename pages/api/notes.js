import connection from "../../database/connection";
import Account from "../../database/models/account";
import { verify } from "jsonwebtoken";
import { parse } from "cookie";

export default async function handler(req, res) {
  const { cookie } = req.headers;
  switch (req.method) {
    case "GET":
      console.log(cookie);
      if (cookie) {
        const parsedCookie = parse(cookie);
        const { authToken } = parsedCookie;
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const payload = verify(authToken, secret);
        const { userId } = payload;
        const db = await connection();
        const user = await Account.findOne({ _id: userId });
        if (user) {
          return res
            .status(200)
            .json({ notes: user.notes, trashedNotes: user.trashedNotes });
        }

        return res.status(404).json({});
      }
      return res.status(401).json({});

      break;
    case "POST":
      console.log(cookie);
      if (cookie) {
        const parsedCookie = parse(cookie);
        const { authToken } = parsedCookie;
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const payload = verify(authToken, secret);
        const { userId } = payload;
        const db = await connection();
        const { body } = req;

        const filter = { name: userId };
        const update = { notes: body.notes, trashedNotes: body.trashedNotes };
        const user = await Account.findOneAndUpdate(filter, update, {
          new: true,
        });

        return res
          .status(200)
          .json({ notes: user.notes, trashedNotes: user.trashedNotes });
      }

      return res.status(401).json({});
      break;

    default:
      break;
  }
}
