import { Router } from "express";
import { medicalController } from "../controllers/medicalController";
import { authenticate } from "../middleware/auth";
import { authorize } from "../middleware/authorize";
import { Role } from "../enums/Role";

const router = Router();

router.post("/create",authenticate, authorize(Role.ADMIN, Role.SALES_HEAD), medicalController.create);

router.get("/allMedical",  medicalController.getAll);

router.get("/:id", medicalController.getById);

router.post("/:medicalId/visits", authenticate, authorize(Role.MR), medicalController.addMrVisit);
router.get("/mr/:id/top-medicines", medicalController.getTopMedicinesByMR);

export default router;
