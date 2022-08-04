import Account from "../../database/models/account";
import { compare } from "bcrypt";
import connection from "../../database/connection";
import {sign} from "jsonwebtoken";
import { serialize } from "cookie";
import {verifyToken} from "../../database/middleware/authentication/index";
import { handleLogin } from "../../database/middleware/login";
import { validCredentials } from "../../database/middleware/credentials.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await validCredentials(req, res, handleLogin);
     
      break;

    default:
      res.status(403).json({});
      break;
  }
}
