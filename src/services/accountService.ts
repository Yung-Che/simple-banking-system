import { Account } from "../models/account";

const accounts: Account[] = [];

export const createAccountService = (name: string, balance: number): Account => {
  const newAccount: Account = { id: Date.now().toString(), name, balance };
  accounts.push(newAccount);
  return newAccount;
};
