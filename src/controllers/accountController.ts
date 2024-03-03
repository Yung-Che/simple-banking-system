import { Request, Response } from "express";
import {
  createAccountService,
  depositService,
  getAccountByIdService,
  transferService,
  withdrawService,
} from "../services/accountService";

/**
 * 取得帳戶資訊
 * @param req
 * @param res
 */
export const getAccount = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    const account = await getAccountByIdService(accountId.toString());

    if (account) {
      res.json(account);
    } else {
      res.status(404).send("Account not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};

/**
 * 新增帳戶
 * @param req
 * @param res
 */
export const createAccount = async (req: Request, res: Response) => {
  try {
    const { name, balance } = req.body;
    const newAccount = await createAccountService(name, balance);
    res.status(201).send(newAccount);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

/**
 * 存款
 * @param req
 * @param res
 */
export const deposit = async (req: Request, res: Response) => {
  try {
    const { id, amount } = req.body;
    const account = await depositService(id, amount);
    if (account) {
      res.status(200).send(account);
    } else {
      res.status(404).send("Account not found");
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

/**
 * 提款
 * @param req
 * @param res
 */
export const withdraw = async (req: Request, res: Response) => {
  try {
    const { id, amount } = req.body;
    const account = await withdrawService(id, amount);
    if (account) {
      res.status(200).send(account);
    } else {
      res.status(400).send("Insufficient funds or account not found");
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

/**
 * 轉帳
 * @param req
 * @param res
 */
export const transfer = async (req: Request, res: Response) => {
  try {
    const { fromId, toId, amount } = req.body;
    const success = await transferService(fromId, toId, amount);

    if (success) {
      res.status(200).send("Transfer successful");
    } else {
      res
        .status(400)
        .send("Transfer failed due to insufficient funds or account not found");
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};
