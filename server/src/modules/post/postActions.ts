import type { RequestHandler } from "express";

// Import access to data
import postRepository from "./postRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all posts
    const posts = await postRepository.readAll();

    // Respond with the posts in JSON format
    res.json(posts);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const itemId = Number(req.params.id);
    const item = await postRepository.read(itemId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const createPost: RequestHandler = async (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  try {
    // Extract the item data from the request body
    const addPost = {
      content: req.body.content,
      user_id: req.user.id,
    };

    // Create the item
    const insertId = await postRepository.create(addPost);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ id: insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, createPost };
