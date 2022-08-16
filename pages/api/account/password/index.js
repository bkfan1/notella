import { verifyToken } from "../../../../database/middleware/authentication/token";
import { changeAccountPassword } from "../../../../database/middleware/account/password";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      return await verifyToken(req, res, changeAccountPassword);

      break;

    default:
      return res.status(400).json({});
      break;
  }
}
