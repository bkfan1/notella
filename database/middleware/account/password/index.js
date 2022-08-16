import { compare, hash } from "bcrypt";
import connection from "../../../connection";
import Account from "../../../models/account";

export const changeAccountPassword = async (req, res, userId) => {
  if (!userId) {
    return await res.status(400).json({ message: "" });
  }

  const { body } = req;
  if (!body.oldPassword) {
    return await res.status(400).json({ message: "Old password is required." });
  }

  if (!body.newPassword) {
    return await res.status(400).json({ message: "New password is required." });
  }

  if (!body.confirmNewPassword) {
    return await res
      .status(400)
      .json({ message: "Confirm new password is required." });
  }

  if (body.confirmNewPassword !== body.newPassword) {
    return await res
      .status(400)
      .json({ message: "Confirm new password dont match with new password." });
  }

  const db = await connection();
  const account = await Account.findOne({ _id: userId });

  compare(body.oldPassword, account.password, async (err, result) => {
    if (err) {
      return await res
        .status(500)
        .json({ message: "Server error, please try again." });
    }
    if (!result) {
      return await res
        .status(400)
        .json({ message: "Current password dont match." });
    }

    hash(body.newPassword, 10, async (err, hashedNewPassword) => {
      if (err) {
        return await res
          .status(500)
          .json({ message: "Server error, please try again." });
      }
      const filter = { _id: userId };
      const update = { password: hashedNewPassword };
      await Account.findOneAndUpdate(filter, update);

      return await res
        .status(200)
        .json({ message: "Password updated successfully." });
    });
  });
};
