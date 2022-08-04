import { registerAccount } from "../../database/middleware/register";
import { validCredentials } from "../../database/middleware/credentials.js";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await validCredentials(req, res, registerAccount);
     
      break;

    default:
      return res.status(400).json({});
      break;
  }
}
