import {registerAccount} from "../../../database/middleware/register";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await registerAccount(req, res);

      break;

    default:
      return res.status(400).json({});
      break;
  }
}
