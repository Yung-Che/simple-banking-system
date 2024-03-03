import {
  createAccountService,
  depositService,
  withdrawService,
  transferService,
  getAccountByIdService,
} from "../../services/accountService";

describe("Account Service", () => {
  describe("createAccountService", () => {
    it("should create a new account with given name and balance", async () => {
      const account = await createAccountService("New Account", 500);
      expect(account).toHaveProperty("id");
      expect(account.name).toEqual("New Account");
      expect(account.balance).toEqual(500);
      expect(account).toEqual(
        expect.objectContaining({ name: "New Account", balance: 500 })
      );
    });
  });

  describe("depositService", () => {
    it("should correctly deposit amount into account", async () => {
      const account = await createAccountService("Deposit Account", 500);
      const updatedAccount = await depositService(account.id, 500);
      expect(updatedAccount).not.toBeUndefined();
      expect(updatedAccount?.balance).toEqual(1000);
    });
  });

  describe("withdrawService", () => {
    it("should correctly withdraw amount from account", async () => {
      const account = await createAccountService("Withdraw Account", 1000);
      const updatedAccount = await withdrawService(account.id, 500);
      expect(updatedAccount).not.toBeUndefined();
      expect(updatedAccount?.balance).toEqual(500);
    });
  });

  describe("transferService", () => {
    it("should correctly transfer amount between two accounts", async () => {
      // 建立兩個帳戶做測試
      const fromAccount = await createAccountService("From Account", 1000);
      const toAccount = await createAccountService("To Account", 500);

      // 轉帳
      const success = await transferService(fromAccount.id, toAccount.id, 500);

      // 驗證轉帳是否成功
      expect(success).toBeTruthy();

      // 查詢轉帳後的狀態
      const updatedFromAccount = await getAccountByIdService(fromAccount.id);
      const updatedToAccount = await getAccountByIdService(toAccount.id);
      expect(updatedFromAccount?.balance).toEqual(500);
      expect(updatedToAccount?.balance).toEqual(1000);
    });
  });
});
