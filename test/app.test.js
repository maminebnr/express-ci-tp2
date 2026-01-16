const request = require("supertest");
const app = require("../src/app");
describe("Express API", () => {
test("GET /health should return ok=true", async () => {
const res = await request(app).get("/health");
expect(res.status).toBe(200);
expect(res.body.ok).toBe(true);
});
test("POST /todos should reject invalid title", async () => {
const res = await request(app).post("/todos").send({ title: ""
});
expect(res.status).toBe(400);
expect(res.body.error).toBeDefined();
});
test("POST /todos should create a todo", async () => {
const res = await request(app).post("/todos").send({ title: "ci pipeline" });
expect(res.status).toBe(201);
expect(res.body.title).toBe("ci pipeline");
expect(res.body.done).toBe(false);
expect(res.body.id).toBeDefined();
});
test("POST /users should create a new user", async () => {
  const res = await request(app)
    .post("/users")
    .send({ name: "Khalil", email: "khalil@school.com" });
  
  expect(res.status).toBe(201);
  expect(res.body.name).toBe("Khalil");
  expect(res.body.id).toBeDefined();
});
});