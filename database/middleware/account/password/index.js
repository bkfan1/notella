import {compare, hash} from "bcrypt";
import connection from "../../../connection";
import Account from "../../../models/account";

export const changeAccountPassword = async (req, res, userId) => {
  const { body } = req;
  if (!body.oldPassword || !body.newPassword || !body.confirmNewPassword) {
    return res.status(400).json({ message: "Invalid credentials." });
  }

  if (body.confirmNewPassword !== body.newPassword) {
    return res
      .status(400)
      .json({ message: "Confirm new password dont match with new password." });
  }

  const db = await connection();
  const account = await Account.findOne({ _id: userId });

  compare(body.oldPassword, account.password, async (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Server error, please try again." });
    }
    if (!result) {
      return res.status(400).json({ message: "Current password dont match." });
    }

    hash(body.newPassword, 10, async (err, hashedNewPassword) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Server error, please try again." });
      }
      const filter = { _id: userId };
      const update = { password: hashedNewPassword };
      await Account.findOneAndUpdate(filter, update);

      return res
        .status(200)
        .json({ message: "Password updated successfully." });
    });
  });
};
