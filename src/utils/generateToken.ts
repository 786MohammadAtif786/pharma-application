import jwt from "jsonwebtoken";

export const generateToken = (userId: string, role: string, email: string, name: string) => {
  return jwt.sign(
    { userId, role, email, name },
    process.env.JWT_SECRET || "secretKey",
    { expiresIn: "1d" }
  );
};
