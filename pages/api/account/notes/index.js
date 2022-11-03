import { verifyToken } from "../../../../database/middleware/authentication/token";

import {
  getAccountNotes,
  updateAccountNotes,
} from "../../../../database/middleware/account/notes";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await verifyToken(req, res, getAccountNotes);
      break;

    case "PUT":
      return await verifyToken(req, res, updateAccountNotes);
      break;

    default:
      return res.status(400).json({});
      break;
  }
}
