import connection from "../../../connection";
import Account from "../../../models/account";
import * as fs from "fs/promises";
import AdmZip from "adm-zip";
import path from "path/posix";

export const getAccountNotes = async (req, res, userId) => {
  const db = await connection();
  const user = await Account.findOne({ _id: userId });
  if (user) {
    return res
      .status(200)
      .json({ notes: user.notes, trashedNotes: user.trashedNotes });
  }
  return res.status(404).json({ message: "User not found." });
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

export const downloadAccountNotes = async (req, res, userId) => {
  if (!userId) {
    return res.status(403).json({});
  }

  const db = await connection();
  const account = await Account.findOne({ _id: userId });

  if (!account) {
    return res.status(404).json({ some: "shit" });
  }

  const { notes, trashedNotes } = account;

  try {
    await fs.mkdir(`./temp/${userId}`);
    await fs.mkdir(`./temp/${userId}/active`);
    await fs.mkdir(`./temp/${userId}/trashed`);
    await fs.mkdir(`./temp/${userId}/source`);

    await notes.forEach(async (note) => {
      await fs.writeFile(
        `./temp/${userId}/active/${note.title}.txt`,
        note.body
      );
    });

    await trashedNotes.forEach(async (note) => {
      await fs.writeFile(
        `./temp/${userId}/trashed/${note.title}.txt`,
        note.body
      );
    });

    await fs.writeFile(
      `./temp/${userId}/source/notes.json`,
      JSON.stringify({ activeNotes: notes, trashedNotes })
    );

    const zip = new AdmZip();
    zip.addLocalFolder(`temp/${userId}`);
    const zipDir = `./temp/user_${userId}_notes.zip`;
    zip.writeZip(zipDir);

    const pth = await path.resolve(process.cwd(), `temp/user_${userId}_notes.zip`);
    const file = await fs.readFile(pth);

    res.setHeader("Content-Type", "application/zip");
    res.status(200).send(file);

    await fs.rm(`./temp/${userId}`, { recursive: true });
    await fs.rm(`./temp/user_${userId}_notes.zip`, { recursive: true });
    return;
  } catch (error) {
    return res.status(400).json({ some: "error" });
  }
};
