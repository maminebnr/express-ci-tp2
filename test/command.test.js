const request = require("supertest");
const app = require("../src/app");

describe("Express API", () => {


  test("POST /command should reject invalid title", async () => {
    const res = await request(app).post("/command").send({ title: "" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("POST /commands should create a command", async () => {
    const res = await request(app).post("/command").send({ title: "ci pipeline" });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("ci pipeline");
    expect(res.body.done).toBe(false);
    expect(res.body.id).toBeDefined();
  });
});
