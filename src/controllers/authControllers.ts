import { Request, Response } from "express";
import { createAdmin, login } from "../services/authService";

export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await createAdmin(req.body);
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};



export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: user,
    });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
}
