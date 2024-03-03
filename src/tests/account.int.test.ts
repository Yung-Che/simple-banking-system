import { Server } from "http";
import request from "supertest";
import { app, startServer } from "../app";

let server: Server;

// 在所有測試之前啟動服務器
beforeAll(() => {
  server = startServer();
});

// 在所有測試之後關閉服務器
afterAll((done) => {
  server.close(done);
});

describe("Account API", () => {
  // 用於存儲創建的賬戶ID
  let createdAccountId: string;

  // 創建帳戶
  it("should create a new account", async () => {
    const res = await request(app).post("/api/accounts").send({
      name: "John Doe",
      balance: 1000,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");

    // 保存創建的賬戶ID以供後續測試使用
    createdAccountId = res.body.id;
    expect(res.body.name).toEqual("John Doe");
    expect(res.body.balance).toEqual(1000);
  });

  // 存款
  it("should deposit money to an account", async () => {
    // 存款金額
    const depositAmount = 500;
    const res = await request(app).post(`/api/accounts/deposit`).send({
      id: createdAccountId,
      amount: depositAmount,
    });
    expect(res.statusCode).toEqual(200);

    // 預期存款後的餘額為1500
    expect(res.body.balance).toEqual(1500);
  });

  // 提款
  it("should withdraw money from an account", async () => {
    // 提款金額
    const withdrawAmount = 200;
    const res = await request(app).post(`/api/accounts/withdraw`).send({
      id: createdAccountId,
      amount: withdrawAmount,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.balance).toEqual(1300);
  });

  // 轉帳
  it("should transfer money from one account to another", async () => {
    // 首先創建另一個賬戶用於轉帳
    const recipientRes = await request(app).post("/api/accounts").send({
      name: "Mary Jane",
      balance: 500,
    });
    expect(recipientRes.statusCode).toEqual(201);
    const recipientAccountId = recipientRes.body.id;

    // 執行轉帳操作
    const transferAmount = 300;
    const transferRes = await request(app).post(`/api/accounts/transfer`).send({
      fromId: createdAccountId,
      toId: recipientAccountId,
      amount: transferAmount,
    });
    expect(transferRes.statusCode).toEqual(200);

    // 確認轉帳後的帳戶資訊
    const finalRes = await request(app).get(
      `/api/accounts/${createdAccountId}`
    );
    expect(finalRes.statusCode).toEqual(200);

    // 預期轉帳後的餘額為1000
    expect(finalRes.body.balance).toEqual(1000);
  });
});
