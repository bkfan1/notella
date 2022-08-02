import { connection } from "../../database/connection";
import Account from "../../database/models/account";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const { body } = req;

      if (!body.email || !body.password) {
        return res.status(400).json({});
      }

      const db = await connection();
      const userWithEmail = await Account.findOne({ email: body.email });
      if (userWithEmail) {
        return res.status(400).json({});
      }

      hash(body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return res.status(400).json({});
        }
        const newUser = await Account.create({
          email: body.email,
          password: hashedPassword,
          createdAt: `${new Date().toLocaleDateString()}`,

          notes: [],
          trashedNotes: [],
        });

        return await res.status(200).json({});
      });

      break;

    default:
      return res.status(400).json({});
      break;
  }
}
