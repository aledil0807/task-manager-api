function validateCreateTask(req, res, next) {
  const { title, status, priority, dueDate } = req.body;

  const allowedStatus = ["pending", "in_progress", "completed"];
  const allowedPriority = ["low", "medium", "high"];

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title is required"
    });
  }

  if (status && !allowedStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value"
    });
  }

  if (priority && !allowedPriority.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: "Invalid priority value"
    });
  }

  if (dueDate && Number.isNaN(new Date(dueDate).getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid dueDate"
    });
  }

  next();
}

function validateUpdateTask(req, res, next) {
  const { title, status, priority, dueDate } = req.body;

  const allowedStatus = ["pending", "in_progress", "completed"];
  const allowedPriority = ["low", "medium", "high"];

  if (title !== undefined && (!title || typeof title !== "string" || !title.trim())) {
    return res.status(400).json({
      success: false,
      message: "Title cannot be empty"
    });
  }

  if (status !== undefined && !allowedStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status value"
    });
  }

  if (priority !== undefined && !allowedPriority.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: "Invalid priority value"
    });
  }

  if (dueDate !== undefined && dueDate !== null && Number.isNaN(new Date(dueDate).getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid dueDate"
    });
  }

  next();
}

module.exports = {
  validateCreateTask,
  validateUpdateTask
};