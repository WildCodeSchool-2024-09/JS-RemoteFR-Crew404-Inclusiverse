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

export default { browse, register };
