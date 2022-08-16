import { verifyToken } from "../../../../database/middleware/authentication/token";
import { handleLogout } from "../../../../database/middleware/authentication/logout";

export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      return await verifyToken(req, res, handleLogout);

      break;

    default:
      res.status(400).json({});
      break;
  }
}
