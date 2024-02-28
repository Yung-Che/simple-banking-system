import { Router } from "express";
import { createAccount, deposit } from "../controllers/accountController";

const router = Router();

router.post("/accounts", createAccount);
router.post("/accounts/deposit", deposit);

export default router;
