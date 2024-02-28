import { Account } from "../models/account";

// 暫存帳戶資訊
const accounts: Account[] = [];

/**
 * 創建帳戶
 * @param name 帳戶姓名
 * @param balance 餘額
 * @returns
 */
export const createAccountService = (
  name: string,
  balance: number
): Account => {
  // 新增一個帳戶
  const newAccount: Account = { id: Date.now().toString(), name, balance };

  // 存在 local 陣列
  accounts.push(newAccount);

  return newAccount;
};

/**
 * 存款
 * @param id 帳戶 id
 * @param amount 金額
 * @returns
 */
export const depositService = (
  id: string,
  amount: number
): Account | undefined => {
  // 尋找 id 是否存在
  const account = accounts.find((account) => account.id === id);

  // 若是則增加帳戶金額
  if (account) {
    account.balance += amount;
    return account;
  }
  return undefined;
};
