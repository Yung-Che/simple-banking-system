import { Router } from "express";
import {
  createAccount,
  deposit,
  transfer,
  withdraw,
} from "../controllers/accountController";

const router = Router();

router.post("/", createAccount);
router.post("/deposit", deposit);
router.post("/withdraw", withdraw);
router.post("/transfer", transfer);

export default router;
