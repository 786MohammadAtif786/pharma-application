import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Role } from "../enums/Role";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";

export const createAdmin = async (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  region?: string;
  createdBy?: string;
}) => {
  const { name, email, password, phone, address, profileImage, region, createdBy } = data;

  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Admin with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new User({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    profileImage,
    region,
    role: Role.ADMIN,
    createdBy,
  });

  await admin.save();

  return admin;
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  user.lastLogin = new Date();
   const userObj = user.toObject();
    userObj.password;
  await user.save();

  return { user, token };
};

