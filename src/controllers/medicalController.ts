import { Request, Response } from "express";
import { medicalService } from "../services/medicalService";
import { AuthRequest } from "../middleware/auth";

export const medicalController = {
  async create(req: Request, res: Response) {
    try {
      const medical = await medicalService.createMedical(req.body);
      res.status(201).json(medical);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const medicals = await medicalService.getAll();
      res.json(medicals);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const medical = await medicalService.getById(req.params.id as string);
      if (!medical) return res.status(404).json({ message: "Not found" });
      res.json(medical);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  async addMrVisit(req: AuthRequest, res: Response) {
    try {
      const { medicalId } = req.params;
          const { medicineId, quantity, pricePerUnit } = req.body;
          const mrId = req.user.userId;

      const medical = await medicalService.addMrVisit(medicalId as string, { medicineId, quantity, pricePerUnit, mrId });
      res.json(medical);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};
