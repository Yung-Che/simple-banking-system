import { Router } from "express";
import { createAccount } from "../controllers/accountController";

const router = Router();

router.post("/accounts", createAccount);

export default router;
