import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { Role } from "../enums/Role";

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
