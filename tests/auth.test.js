const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/db");

describe("Auth routes", () => {
  const testUser = {
    name: "Carlos Test",
    email: "carlos.test@example.com",
    password: "12345678"
  };

  beforeAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: testUser.email
      }
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: testUser.email
      }
    });

    await prisma.$disconnect();
  });

  test("should register a user successfully", async () => {
    const response = await request(app).post("/api/auth/register").send(testUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.email).toBe(testUser.email);
    expect(response.body.data.token).toBeDefined();
  });

  test("should login successfully", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
  });

  test("should return current user with valid token", async () => {
    const loginResponse = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password
    });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(testUser.email);
  });
});