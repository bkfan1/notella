import { serialize } from "cookie";

export const handleLogout = async (req, res) => {
  const cookie = serialize("authToken", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV === "development" ? "strict" : "lax",
    maxAge: 0,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);

  return res.status(200).json({ message: "Logged out successfully." });
};
