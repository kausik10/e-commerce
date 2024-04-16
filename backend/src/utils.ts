import jwt from "jsonwebtoken";
import { User } from "./model/userModel";
export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "30d",
    },
  );
};
