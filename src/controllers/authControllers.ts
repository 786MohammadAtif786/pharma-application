import { Request, Response } from "express";
import authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register({ name, email, password });
    res.status(201).json({ user: result.user, token: result.token });
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    console.log(result);
    
    res.status(200).json({ user: result.user, token: result.token });
  } catch (err: any) {
    res.status(401).json({ message: err.message || "Login failed" });
  }
};
