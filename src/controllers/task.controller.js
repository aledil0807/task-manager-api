const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../services/task.service");

async function createTaskController(req, res, next) {
  try {
    const task = await createTask(req.user.userId, req.body);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
}

async function getTasksController(req, res, next) {
  try {
    const result = await getTasks(req.user.userId, req.query);

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: result.items,
      meta: result.meta
    });
  } catch (error) {
    next(error);
  }
}

async function getTaskByIdController(req, res, next) {
  try {
    const task = await getTaskById(req.user.userId, req.params.id);

    res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
}

async function updateTaskController(req, res, next) {
  try {
    const task = await updateTask(req.user.userId, req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });
  } catch (error) {
    next(error);
  }
}

async function deleteTaskController(req, res, next) {
  try {
    const result = await deleteTask(req.user.userId, req.params.id);

    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController
};