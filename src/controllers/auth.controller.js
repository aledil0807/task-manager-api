const {
  registerUser,
  loginUser,
  getCurrentUser
} = require("../services/auth.service");

async function registerController(req, res, next) {
  try {
    const result = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
}

async function loginController(req, res, next) {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    next(error);
  }
}

async function meController(req, res, next) {
  try {
    const user = await getCurrentUser(req.user.userId);

    res.status(200).json({
      success: true,
      message: "Current user fetched successfully",
      data: user
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerController,
  loginController,
  meController
};