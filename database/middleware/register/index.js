import connection from "../../connection";
import { hash } from "bcrypt";
import Account from "../../models/account";
import { email } from "../../../utils/regex";
import { readmeNote } from "../../../utils/initialAccountNote";

export const registerAccount = async (req, res) => {
  const { body } = req;

  if (!body.email) {
    return await res.status(400).json({ message: "Email is required." });
  }

  if (!body.password) {
    return await res.status(400).json({ message: "Password is required." });
  }

  if (!email.test(body.email)) {
    return res.status(400).json({ message: "Invalid email." });
  }

  if (email.length < 8) {
    return await res
      .status(400)
      .json({ message: "Password needs to be at least 8 characters long." });
  }

  const db = await connection();

  const userWithThatEmail = await Account.findOne({ email: body.email });
  if (userWithThatEmail) {
    return res
      .status(400)
      .json({ message: "Already exists an account with that email." });
  }

  hash(body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return await res
        .status(500)
        .json({ message: "Server error, please try again." });
    }

    const newUser = await Account.create({
      email: body.email,
      password: hashedPassword,
      createdAt: `${new Date().toLocaleDateString()}`,

      notes: [readmeNote],
      trashedNotes: [],
    });

    return await res
      .status(200)
      .json({ message: "Account registered successfully." });
  });
};
