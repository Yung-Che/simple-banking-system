import { Request, Response } from "express";
import {
  createAccountService,
  depositService,
} from "../services/accountService";

/**
 * 新增帳戶
 * @param req
 * @param res
 */
export const createAccount = (req: Request, res: Response) => {
  try {
    const { name, balance } = req.body;
    const newAccount = createAccountService(name, balance);
    res.status(201).send(newAccount);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

/**
 * 存款
 * @param req
 * @param res
 */
export const deposit = (req: Request, res: Response) => {
  try {
    const { id, amount } = req.body;
    const account = depositService(id, amount);
    if (account) {
      res.status(200).send(account);
    } else {
      res.status(404).send("Account not found");
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
