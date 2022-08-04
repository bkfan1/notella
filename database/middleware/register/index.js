import connection from "../../connection";
import { hash } from "bcrypt";
import Account from "../../models/account";

export const registerAccount = async (req, res) => {
  const { body } = req;

  const db = await connection();

  const userWithThatEmail = await Account.find({ email: body.email });
  if (userWithThatEmail) {
    return res.status(400).json({ message: "email already registered" });
  }

  hash(body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({});
    }

    const newUser = await Account.create({
      email: body.email,
      password: hashedPassword,
      createdAt: `${new Date().toLocaleDateString()}`,

      notes: [],
      trashedNotes: [],
    });

    return res.status(200).json({ message: "user registered" });
  });
};
