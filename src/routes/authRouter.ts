import { Router } from "express";
import { registerAdmin, loginUser } from "../controllers/authControllers";

const router = Router();

router.post("/register-admin", registerAdmin);
router.post("/login-admin", loginUser);

export default router;
