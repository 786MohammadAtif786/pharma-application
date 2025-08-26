import { Request, Response } from "express";
import { authService } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { user } = await authService.register(req.body);
    res.status(201).json({ success: true, message: "User registered", user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.json({ success: true, message: "Login successful", user, token });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    const { userId } = (req as any).user;

    const { user } = await authService.changePassword(userId, newPassword);
    res.json({ success: true, message: "Password changed successfully", user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
