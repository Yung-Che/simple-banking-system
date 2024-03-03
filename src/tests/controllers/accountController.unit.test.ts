import {
  createAccount,
  deposit,
  withdraw,
} from "../../controllers/accountController";
import * as accountService from "../../services/accountService";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

// 模擬 accountService
jest.mock("../../services/accountService");

// 隨機 id
const randomId = uuidv4();

const mockRequest = (body: AccountRequestBody = {}) =>
  ({
    body,
  } as Request);

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("createAccount controller", () => {
  it("should call createAccountService with the correct parameters", async () => {
    const req = mockRequest({ name: "Test Account", balance: 1000 });
    const res = mockResponse();

    (accountService.createAccountService as jest.Mock).mockReturnValue({
      id: randomId,
      name: "Test Account",
      balance: 1000,
    });

    await createAccount(req, res);

    expect(accountService.createAccountService).toHaveBeenCalledWith(
      "Test Account",
      1000
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        id: randomId,
        name: "Test Account",
        balance: 1000,
      })
    );
  });
});

describe("deposit", () => {
  it("should deposit money into account and return updated account", async () => {
    const req = mockRequest({ id: "1", amount: 500 });
    const res = mockResponse();
    const expectedAccount = { id: "1", balance: 1500 };

    (accountService.depositService as jest.Mock).mockReturnValue(
      expectedAccount
    );

    await deposit(req, res);

    expect(accountService.depositService).toHaveBeenCalledWith("1", 500);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(expectedAccount);
  });
});

describe("withdraw", () => {
  it("should withdraw money from account and return updated account", async () => {
    const req = mockRequest({ id: "1", amount: 200 });
    const res = mockResponse();
    const expectedAccount = { id: "1", balance: 800 };

    (accountService.withdrawService as jest.Mock).mockReturnValue(
      expectedAccount
    );

    await withdraw(req, res);

    expect(accountService.withdrawService).toHaveBeenCalledWith("1", 200);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(expectedAccount);
  });
});
