import { User } from "../models/User";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

class AuthService {
  async register(data: any) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) throw new Error("Email already registered");

    const user = new User(data);
    await user.save();

    return { user };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid email or password");

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user.id, user.role);

    return { user, token };
  }

  async changePassword(userId: string, newPassword: string) {
    const user = await User.findById(userId).select("+password");
    if (!user) throw new Error("User not found");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isFirstLogin = false;
    await user.save();

    return { user };
  }
}

export const authService = new AuthService();
