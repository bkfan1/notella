import connection from "../../connection";
import { hash } from "bcrypt";
import Account from "../../models/account";
import {email} from "../../../utils/regex";
import { readmeNote } from "../../../utils/initialAccountNote";

export const registerAccount = async (req, res) => {
  const { body } = req;

  if(!body.email || !body.password){return res.status(400).json({message:'No credentials have been sent.'});}

  if(!email.test(body.email) || body.password.length < 8){return res.status(400).json({message: 'Invalid email or password.'})};

  const db = await connection();

  const userWithThatEmail = await Account.findOne({ email: body.email });
  if (userWithThatEmail) {
    return res.status(400).json({ message: 'Already exists an account with that email.' });
  }

  hash(body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({message:'Server error, please try again.'});
    }

    const newUser = await Account.create({
      email: body.email,
      password: hashedPassword,
      createdAt: `${new Date().toLocaleDateString()}`,

      notes: [readmeNote],
      trashedNotes: [],
    });

    return res.status(200).json({ message: 'Account registered successfully.' });
  });
};
