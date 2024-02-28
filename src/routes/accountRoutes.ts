import { Router } from "express";
import {
  createAccount,
  deposit,
  transfer,
  withdraw,
} from "../controllers/accountController";

const router = Router();

router.post("/accounts", createAccount);
router.post("/accounts/deposit", deposit);
router.post("/accounts/withdraw", withdraw);
router.post("/accounts/transfer", transfer);

export default router;
