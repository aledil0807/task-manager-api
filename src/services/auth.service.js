const bcrypt = require("bcryptjs");
const prisma = require("../config/db");
const { generateToken } = require("../utils/jwt");

async function registerUser({ name, email, password }) {
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash
    }
  });

  const token = generateToken({
    userId: user.id,
    email: user.email
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}

async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({
    userId: user.id,
    email: user.email
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}

async function getCurrentUser(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
};