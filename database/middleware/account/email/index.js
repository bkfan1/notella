import connection from "../../../connection";
import Account from "../../../models/account";
import { email } from "../../../../utils/regex";

export const changeAccountEmail = async (req, res, userId) => {
  const { body } = req;

  if (!body.newEmail || !body.confirmNewEmail) {
    return res.status(400).json({ message: "Invalid credentials." });
  }

  if (body.newEmail !== body.confirmNewEmail) {
    return res
      .status(400)
      .json({ message: "Confirm email dont match with new email." });
  }

  if (!email.test(body.newEmail)) {
    return res.status(400).json({ message: "Invalid new email." });
  }

  if (!email.test(body.confirmNewEmail)) {
    return res.status(400).json({ message: "Invalid confirm new email." });
  }

  const db = await connection();
  const accountWithEmail = await Account.findOne({ email: body.newEmail });

  if (accountWithEmail) {
    return res
      .status(400)
      .json({ message: "Already exists an account with that email." });
  }

  const filter = { _id: userId };
  const update = { email: body.newEmail };

  const account = await Account.findOneAndUpdate(filter, update);
  return res.status(200).json({ message: "Email updated successfully." });
};
