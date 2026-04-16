const prisma = require("../config/db");
const { getPagination } = require("../utils/pagination");

async function createTask(userId, taskData) {
  const { title, description, status, priority, dueDate } = taskData;

  const task = await prisma.task.create({
    data: {
      title: title.trim(),
      description: description?.trim() || null,
      status: status || "pending",
      priority: priority || "medium",
      dueDate: dueDate ? new Date(dueDate) : null,
      userId
    }
  });

  return task;
}

async function getTasks(userId, query) {
  const {
    status,
    priority,
    search,
    sortBy = "createdAt",
    order = "desc"
  } = query;

  const { page, limit, skip, take } = getPagination(query);

  const where = {
    userId
  };

  if (status) {
    where.status = status;
  }

  if (priority) {
    where.priority = priority;
  }

  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive"
        }
      },
      {
        description: {
          contains: search,
          mode: "insensitive"
        }
      }
    ];
  }

  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "dueDate",
    "title",
    "priority",
    "status"
  ];

  const safeSortBy = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

  const safeOrder = order === "asc" ? "asc" : "desc";

  const [tasks, total] = await prisma.$transaction([
    prisma.task.findMany({
      where,
      orderBy: {
        [safeSortBy]: safeOrder
      },
      skip,
      take
    }),
    prisma.task.count({
      where
    })
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    items: tasks,
    meta: {
      total,
      page,
      limit,
      totalPages
    }
  };
}

async function getTaskById(userId, taskId) {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId
    }
  });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
}

async function updateTask(userId, taskId, taskData) {
  await getTaskById(userId, taskId);

  const data = {};

  if (taskData.title !== undefined) data.title = taskData.title.trim();
  if (taskData.description !== undefined) {
    data.description = taskData.description?.trim() || null;
  }
  if (taskData.status !== undefined) data.status = taskData.status;
  if (taskData.priority !== undefined) data.priority = taskData.priority;
  if (taskData.dueDate !== undefined) {
    data.dueDate = taskData.dueDate ? new Date(taskData.dueDate) : null;
  }

  const updatedTask = await prisma.task.update({
    where: {
      id: taskId
    },
    data
  });

  return updatedTask;
}

async function deleteTask(userId, taskId) {
  await getTaskById(userId, taskId);

  await prisma.task.delete({
    where: {
      id: taskId
    }
  });

  return { message: "Task deleted successfully" };
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};