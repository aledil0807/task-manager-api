const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/db");

describe("Task routes", () => {
  const testUser = {
    name: "Tasks User",
    email: "tasks.user@example.com",
    password: "12345678"
  };

  let token;
  let createdTaskId;

  beforeAll(async () => {
    await prisma.task.deleteMany({
      where: {
        user: {
          email: testUser.email
        }
      }
    });

    await prisma.user.deleteMany({
      where: {
        email: testUser.email
      }
    });

    await request(app).post("/api/auth/register").send(testUser);

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password
    });

    token = loginResponse.body.data.token;
  });

  afterAll(async () => {
    await prisma.task.deleteMany({
      where: {
        user: {
          email: testUser.email
        }
      }
    });

    await prisma.user.deleteMany({
      where: {
        email: testUser.email
      }
    });

    await prisma.$disconnect();
  });

  test("should block task creation without token", async () => {
    const response = await request(app).post("/api/tasks").send({
      title: "Unauthorized task"
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  test("should create a task with valid token", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Finish testing module",
        description: "Create integration tests",
        status: "pending",
        priority: "high"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe("Finish testing module");

    createdTaskId = response.body.data.id;
  });

  test("should list tasks for authenticated user", async () => {
    const response = await request(app)
      .get("/api/tasks?page=1&limit=10")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.meta).toBeDefined();
  });

  test("should get task by id", async () => {
    const response = await request(app)
      .get(`/api/tasks/${createdTaskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(createdTaskId);
  });
});