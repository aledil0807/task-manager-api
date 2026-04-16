const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description:
        "REST API for task management with JWT authentication, Express, Prisma, and PostgreSQL."
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        RegisterInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Carlos"
            },
            email: {
              type: "string",
              format: "email",
              example: "carlos@example.com"
            },
            password: {
              type: "string",
              example: "12345678"
            }
          }
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "carlos@example.com"
            },
            password: {
              type: "string",
              example: "12345678"
            }
          }
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            message: {
              type: "string",
              example: "Login successful"
            },
            data: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                },
                user: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "cm123abc456"
                    },
                    name: {
                      type: "string",
                      example: "Carlos"
                    },
                    email: {
                      type: "string",
                      example: "carlos@example.com"
                    }
                  }
                }
              }
            }
          }
        },
        Task: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "cm_task_123"
            },
            title: {
              type: "string",
              example: "Finish portfolio API"
            },
            description: {
              type: "string",
              nullable: true,
              example: "Complete Swagger documentation"
            },
            status: {
              type: "string",
              enum: ["pending", "in_progress", "completed"],
              example: "pending"
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high"],
              example: "high"
            },
            dueDate: {
              type: "string",
              format: "date-time",
              nullable: true,
              example: "2026-04-20T00:00:00.000Z"
            },
            userId: {
              type: "string",
              example: "cm_user_123"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          }
        },
        CreateTaskInput: {
          type: "object",
          required: ["title"],
          properties: {
            title: {
              type: "string",
              example: "Finish portfolio API"
            },
            description: {
              type: "string",
              example: "Complete Swagger documentation"
            },
            status: {
              type: "string",
              enum: ["pending", "in_progress", "completed"],
              example: "pending"
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high"],
              example: "high"
            },
            dueDate: {
              type: "string",
              format: "date",
              example: "2026-04-20"
            }
          }
        },
        UpdateTaskInput: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Update portfolio API"
            },
            description: {
              type: "string",
              nullable: true,
              example: "Docs finished"
            },
            status: {
              type: "string",
              enum: ["pending", "in_progress", "completed"],
              example: "completed"
            },
            priority: {
              type: "string",
              enum: ["low", "medium", "high"],
              example: "medium"
            },
            dueDate: {
              type: "string",
              format: "date",
              nullable: true,
              example: "2026-04-25"
            }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false
            },
            message: {
              type: "string",
              example: "Invalid credentials"
            }
          }
        },
        TasksListResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true
            },
            message: {
              type: "string",
              example: "Tasks fetched successfully"
            },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Task"
              }
            },
            meta: {
              type: "object",
              properties: {
                total: {
                  type: "integer",
                  example: 37
                },
                page: {
                  type: "integer",
                  example: 2
                },
                limit: {
                  type: "integer",
                  example: 10
                },
                totalPages: {
                  type: "integer",
                  example: 4
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
