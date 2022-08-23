import connection from "../../../connection";
import Account from "../../../models/account";

export const getAccountNotes = async (req, res, userId) => {
  if (!userId) {
    return await res.status(400).json({ message: "" });
  }

  const db = await connection();
  const user = await Account.findOne({ _id: userId });
  if (!user) {
    return await res.status(404).json({ message: "User not found." });
  }

  return await res
    .status(200)
    .json({ notes: user.notes, trashedNotes: user.trashedNotes });
};

export const updateAccountNotes = async (req, res, userId) => {
  if (!userId) {
    return await res.status(400).json({ message: "" });
  }
  const { body } = req;
  if (!body.notes) {
    return await res.status(400).json({ message: "No notes were provided." });
  }
  if (!body.trashedNotes) {
    return await res
      .status(400)
      .json({ message: "No trashed notes were provided." });
  }

  const filter = { _id: userId };
  const update = { notes: body.notes, trashedNotes: body.trashedNotes };
  const db = await connection();
  const updatedUser = await Account.findOneAndUpdate(filter, update, {
    new: true,
  });
  return await res
    .status(200)
    .json({ notes: updatedUser.notes, trashedNotes: updatedUser.trashedNotes });
};
