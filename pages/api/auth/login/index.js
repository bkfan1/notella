import { handleLogin } from "../../../../database/middleware/authentication/login/index";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await handleLogin(req, res);

      break;

    default:
      res.status(403).json({});
      break;
  }
}
