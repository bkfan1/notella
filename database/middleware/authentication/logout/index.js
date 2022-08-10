import { serialize } from "cookie";

export const handleLogout = async (req, res) => {
    
  const serialized = serialize("authToken", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);

  return res.status(200).json({ message: "Logged out successfully." });
};
