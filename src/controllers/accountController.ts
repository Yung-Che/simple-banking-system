import { Request, Response } from "express";
import { createAccountService } from "../services/accountService";

export const createAccount = (req: Request, res: Response) => {
  const { name, balance } = req.body;
  const newAccount = createAccountService(name, balance);
  res.status(201).send(newAccount);
};
