import { compare, hash } from "bcrypt";
import connection from "../../connection";
import Account from "../../models/account";
import { email } from "../../../utils/regex";

export const getAccountNotes = async (req, res, userId) => {
  const db = await connection();
  const user = await Account.findOne({ _id: userId });
  if (user) {
    return res
      .status(200)
      .json({ notes: user.notes, trashedNotes: user.trashedNotes });
  }
  return res.status(404).json({});
};

export const updateAccountNotes = async (req, res, userId) => {
  const { body } = req;
  const filter = { _id: userId };
  const update = { notes: body.notes, trashedNotes: body.trashedNotes };
  const db = await connection();
  const user = await Account.findOneAndUpdate(filter, update, { new: true });
  return res
    .status(200)
    .json({ notes: user.notes, trashedNotes: user.trashedNotes });
};

export const changeAccountPassword = async (req, res, userId) => {
  const { body } = req;
  if (!body.oldPassword || !body.newPassword || !body.confirmNewPassword) {
    return res.status(403).json({message:'Invalid credentials.'});
  }

  if (body.confirmNewPassword !== body.newPassword) {
    return res.status(403).json({message:'Passwords dont match.'});
  }

  const db = await connection();
  const account = await Account.findOne({ _id: userId });

  compare(body.oldPassword, account.password, async (err, result) => {
    if (err) {
      return res.status(500).json({message:'Server error, please try again.'});
    }
    if (!result) {
      return res.status(403).json({message:'Passwords dont match.'});
    }

    hash(body.newPassword, 10, async (err, hashedNewPassword) => {
      if (err) {
        return res.status(500).json({message:'Server error, please try again.'});
      }
      const filter = { _id: userId };
      const update = { password: hashedNewPassword };
      await Account.findOneAndUpdate(filter, update);

      return res.status(200).json({ message: "Password updated successfully." });
    });
  });
};

export const changeAccountEmail = async (req, res, userId) => {
  const { body } = req;

  if (!body.newEmail || !body.confirmNewEmail) {
    return res.status(403).json({message:'Invalid credentials.'});
  }

  if (body.newEmail !== body.confirmNewEmail) {
    return res.status(403).json({message:'Confirm email dont match with new email.'});
  }

  if (!email.test(body.newEmail) || !email.test(body.confirmNewEmail)) {
    return res.status(404).json({message:'Invalid credentials'});
  }

  const db = await connection();
  const accountWithEmail = await Account.findOne({ email: body.newEmail });

  if (accountWithEmail) {
    return res.status(403).json({message:'Already exists an account with that email.'});
  }

  const filter = { _id: userId };
  const update = { email: body.newEmail };

  const account = await Account.findOneAndUpdate(filter, update);
  return res.status(200).json({ message: "Email updated successfully." });
};

export const deleteAccount = async (req, res, userId) => {
  const db = await connection();
  const user = await Account.findByIdAndDelete({ _id: userId });
  return res.status(200).json({ message: "Account deleted successfully." });
};
