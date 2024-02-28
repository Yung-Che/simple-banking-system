import { Router } from "express";
import {
  createAccount,
  deposit,
  withdraw,
} from "../controllers/accountController";

const router = Router();

router.post("/accounts", createAccount);
router.post("/accounts/deposit", deposit);
router.post("/accounts/withdraw", withdraw);

export default router;
