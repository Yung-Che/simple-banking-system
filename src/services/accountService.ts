import { Account } from "../models/account";
import { TransactionLog } from "../models/transactionLog";
import { v4 as uuidv4 } from "uuid";

// 暫存帳戶資訊
const accounts: Account[] = [];

// 暫存交易日誌資訊
const transactionLogs: TransactionLog[] = [];

/**
 * 取得帳戶資訊
 * @param accountId 帳戶 id
 * @returns Account
 */
export const getAccountByIdService = async (
  accountId: string
): Promise<Account | undefined> => {
  const account = accounts.find((account) => account.id === accountId);

  return account;
};

/**
 * 創建帳戶
 * @param name 帳戶姓名
 * @param balance 餘額
 * @returns Account
 */
export const createAccountService = async (
  name: string,
  balance: number
): Promise<Account> => {
  // 餘額不為負數
  if (balance < 0) {
    throw new Error("Account balance cannot be negative");
  }

  // 新增一個帳戶
  const newAccount: Account = { id: uuidv4(), name, balance };

  // 存至 local 陣列
  accounts.push(newAccount);

  return newAccount;
};

/**
 * 存款
 * @param id 帳戶 id
 * @param amount 存款金額
 * @returns Account | undefined
 */
export const depositService = async (
  id: string,
  amount: number
): Promise<Account | undefined> => {
  // 透過 id  尋找帳戶是否存在
  const account = accounts.find((account) => account.id === id);

  // 若是，則增加帳戶金額
  if (account) {
    account.balance += amount;
    return account;
  }
  return undefined;
};

/**
 * 提款
 * @param id 帳戶 id
 * @param amount 提款金額
 * @returns Account | undefined
 */
export const withdrawService = async (
  id: string,
  amount: number
): Promise<Account | undefined> => {
  // 透過 id  尋找帳戶是否存在
  const account = accounts.find((account) => account.id === id);

  if (account && account.balance >= amount) {
    account.balance -= amount;
    return account;
  }
  return undefined;
};

/**
 * 轉帳
 * @param fromId 轉出帳戶 id
 * @param toId 轉入帳戶 id
 * @param amount 金額
 * @returns boolean
 */
export const transferService = async (
  fromId: string,
  toId: string,
  amount: number
): Promise<boolean> => {
  // 透過 id  尋找帳戶是否存在
  const fromAccount = accounts.find((account) => account.id === fromId);
  const toAccount = accounts.find((account) => account.id === toId);

  // 檢查資訊是否正確
  if (!fromAccount || !toAccount || fromAccount.balance < amount) {
    return false;
  }

  // 沒有串接資料庫，以下模擬 transaction

  // 宣告變數儲存原始餘額
  const originalFromBalance = fromAccount.balance;
  const originalToBalance = toAccount.balance;

  try {
    // 執行操作
    fromAccount.balance -= amount;
    toAccount.balance += amount;

    // 轉帳成功後，紀錄交易日誌
    await logTransaction(fromId, toId, amount);

    return true;
  } catch (error) {
    // 若出現錯誤，回到原始狀態
    fromAccount.balance = originalFromBalance;
    toAccount.balance = originalToBalance;

    return false;
  }
};

/**
 * 交易日誌
 * @param fromId 轉出帳戶 id
 * @param toId 轉入帳戶 id
 * @param amount 金額
 */
const logTransaction = async (
  fromId: string,
  toId: string,
  amount: number
): Promise<void> => {
  const logEntry: TransactionLog = {
    timestamp: new Date(),
    fromAccountId: fromId,
    toAccountId: toId,
    amount: amount,
  };
  transactionLogs.push(logEntry);
  console.log("Transaction Log:", logEntry);
};
