import { Request, Response } from "express";
import { medicineService } from "../services/medicineService";
import { AuthRequest } from "../middleware/auth";


interface IdParam {
  id: string;
}

export class MedicineController {
    
  async createMedicine(req: AuthRequest, res: Response) {
    try {
      const product = await medicineService.createMedicine({
        ...req.body,
        createdBy: req.user.userId,
        createdByName: req.user.name
      });
      
      res.status(201).json(product);
      console.log("userID", req.user);
      
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllMedicine(_req: Request, res: Response) {
    try {
      const products = await medicineService.getAllMedicine();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getMedicineById(req: Request<IdParam>, res: Response) {
    try {
      const product = await medicineService.getMedicineById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateMedicine(req: AuthRequest, res: Response) {
    try {
      const updated = await medicineService.updateMedicine(
        req.params.id as string,
        req.body,
        req.user.userId
      );
      if (!updated) return res.status(404).json({ message: "Product not found" });
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteMedicine(req: AuthRequest, res: Response) {
    try {
      const deleted = await medicineService.deleteMedicine(req.params.id as string, req.user.userId);
      if (!deleted) return res.status(404).json({ message: "Product not found" });
      res.json({ message: "Product deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const medicineController = new MedicineController();
