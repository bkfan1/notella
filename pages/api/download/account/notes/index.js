import { verifyToken } from "../../../../../database/middleware/authentication/token";
import { downloadAccountNotes } from "../../../../../database/middleware/account/notes";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await verifyToken(req, res, downloadAccountNotes);

      break;

    default:
      return res.status(400).json({});
      break;
  }
}
