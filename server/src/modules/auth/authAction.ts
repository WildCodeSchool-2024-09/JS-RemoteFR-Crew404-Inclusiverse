import type { RequestHandler } from "express";
import { createToken } from "../../middleware/jwtMiddleware";

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
    if (!req.user) {
      res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
      return;
    }
    // Create a token
    const token = createToken({
      id: req.user.id,
      email: req.user.email,
    });

    // Respond with the user in JSON format
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(req.user);
  } catch (err) {
    next(err);
  }
};

export default { browse, register, login };
