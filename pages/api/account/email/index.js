import { verifyToken } from "../../../../database/middleware/authentication/token";

import { changeAccountEmail } from "../../../../database/middleware/account/email";

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      return await verifyToken(req, res, changeAccountEmail);

      break;

    default:
      return res.status(400).json({});
      break;
  }
}
