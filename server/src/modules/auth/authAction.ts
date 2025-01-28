import type { RequestHandler } from "express";

// Import access to data
import authRepository from "./authRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all users
    const users = await authRepository.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const register: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all users
    const user = await authRepository.create(req.body);

    // Respond with the users in JSON format
    res.json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const login = await authRepository.read(req.body.email);
    if (!login) {
      res.status(401).json({ message: "user not found" });
      return;
    }
    if (login.password !== req.body.password) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    res.status(200).json(login);
  } catch (err) {
    next(err);
  }
};

export default { browse, register, login };
