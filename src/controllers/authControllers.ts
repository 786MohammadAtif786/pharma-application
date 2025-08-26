import { Request, Response } from "express";
import { createAdmin } from "../services/authService";

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