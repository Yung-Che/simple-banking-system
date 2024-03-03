import {
  createAccountService,
  depositService,
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
});
