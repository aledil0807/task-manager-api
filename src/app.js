const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const prisma = require("./config/db");
const swaggerSpec = require("./config/swagger");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Task Manager API is running"
  });
});

app.get("/health/db", async (_req, res) => {
  try {
    await prisma.$connect();

    res.json({
      success: true,
      message: "Database connection successful"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message
    });
  }
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorMiddleware);

module.exports = app;