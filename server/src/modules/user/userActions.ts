import type { RequestHandler } from "express";

// Import access to data
import userRepository from "./userRepository";

// The R of BREAD - Read operation
const me: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }
    // Fetch a specific user based on the provided ID
    const user = await userRepository.read(req.user.id);

    const userWithoutPassword = { ...user, password: undefined };

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(userWithoutPassword);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const updateMe: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    // Parse the request body
    req.body.user = JSON.parse(req.body.user);

    // Update user data
    const updateUser = {
      ...req.body.user,
      avatar: req.body.avatar,
    };
    const user = await userRepository.update(req.user.id, updateUser);

    if (user == null) {
      res.sendStatus(404);
      return;
    }

    res.json(user);

    // res.json(updateUser);
  } catch (err) {
    next(err);
  }
};

const updateMePassword: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    const updatePassword = await userRepository.updatePassword(
      req.user.id,
      req.body.password,
    );

    if (updatePassword == null) {
      res.sendStatus(404);
      return;
    }

    res.json(updatePassword);
  } catch (err) {
    next(err);
  }
};

export default { me, updateMe, updateMePassword };
