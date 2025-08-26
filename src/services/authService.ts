import jwt from "jsonwebtoken";
import { User, IUser } from "../models/User";
import { Role } from "../enums/Role";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt";



class AuthService {
  async register(data: { name: string; email: string; password: string }) {
    const existing = await User.findOne({ email: data.email });
    if (existing) throw new Error("Email already registered");

    const user = await User.create(data);
    const token = this.generateToken(user);
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    const userObj = user.toObject();
     user.lastLogin = new Date();
     
    const token = this.generateToken(user as IUser);
    return { user: userObj, token };
  }

  generateToken(user: { _id: any; email?: string; role?: string }) {
    return jwt.sign(
      { sub: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }
}

export default new AuthService();