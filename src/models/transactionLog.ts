/**
 * 交易紀錄日誌
 */
export interface TransactionLog {
  // 交易時間
  timestamp: Date;

  // 轉出帳戶 ｉｄ
  fromAccountId: string;

  // 轉入帳戶 ｉｄ
  toAccountId: string;

  // 金額
  amount: number;
}
