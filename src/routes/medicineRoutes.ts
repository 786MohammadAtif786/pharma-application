import { Router } from "express";
import { medicineController } from "../controllers/medicineControllers";
import { authenticate } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { Role } from "../enums/Role";

const router = Router();

// Create product (only ADMIN, SALES_HEAD)
router.post("/medinice", authenticate, authorize(Role.ADMIN, Role.SALES_HEAD), (req, res) =>
  medicineController.createMedicine(req, res)
);

// Get all products (public or logged-in users)
router.get("/allMedicine", (req, res) => medicineController.getAllMedicine(req, res));

// Get single product
router.get("/:id", (req, res) => medicineController.getMedicineById(req, res));

// Update product (only ADMIN, SALES_HEAD)
router.put("/:id", authenticate, authorize(Role.ADMIN, Role.SALES_HEAD), (req, res) =>
  medicineController.updateMedicine(req, res)
);

// Soft delete product (only ADMIN)
router.delete("/:id", authenticate, authorize(Role.ADMIN), (req, res) =>
  medicineController.deleteMedicine(req, res)
);

export default router;
