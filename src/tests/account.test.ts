import { Server } from "http";
import request from "supertest";
import { app, startServer } from "../app";

let server: Server;

beforeAll(() => {
  server = startServer();
});

afterAll((done) => {
  server.close(done);
});

describe("Account API", () => {
  let createdAccountId: string;

  it("should create a new account", async () => {
    const res = await request(app).post("/api/accounts").send({
      name: "John Doe",
      balance: 1000,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    createdAccountId = res.body.id;
    expect(res.body.name).toEqual("John Doe");
    expect(res.body.balance).toEqual(1000);
  });

  it("should deposit money to an account", async () => {
    const depositAmount = 500;
    const res = await request(app).post(`/api/accounts/deposit`).send({
      id: createdAccountId,
      amount: depositAmount,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.balance).toEqual(1500);
  });
});
