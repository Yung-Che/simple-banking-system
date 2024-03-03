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
  it("should create a new account", async () => {
    const res = await request(app).post("/api/accounts").send({
      name: "John Doe",
      balance: 1000,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toEqual("John Doe");
    expect(res.body.balance).toEqual(1000);
  });
});
