import connection from "../../database/connection";
import Account from "../../database/models/account";
import { verifyToken } from "../../database/middleware/authentication";
import {
  getAccountNotes,
  updateAccountNotes,
} from "../../database/middleware/account";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await verifyToken(req, res, getAccountNotes);

      break;
    case "POST":
      return await verifyToken(req, res, updateAccountNotes);

    case "PUT":
      const { headers, cookies } = req;
      console.log(headers);
      console.log(cookies);
      break;

    default:
      return res.status(400).json({});
      break;
  }
}
