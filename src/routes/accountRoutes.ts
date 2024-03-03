import { Router } from "express";
import {
  createAccount,
  deposit,
  getAccount,
  transfer,
  withdraw,
} from "../controllers/accountController";

const router = Router();

router.get("/:accountId", getAccount);
router.post("/", createAccount);
router.post("/deposit", deposit);
router.post("/withdraw", withdraw);
router.post("/transfer", transfer);

export default router;
