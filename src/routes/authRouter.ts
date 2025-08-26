import { Router } from "express";
import { registerAdmin } from "../controllers/authControllers";

const router = Router();

router.post("/register-admin", registerAdmin);

export default router;
