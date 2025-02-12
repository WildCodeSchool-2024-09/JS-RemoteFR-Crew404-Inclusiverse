import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

/** Middleware */
import authMiddleware from "./middleware/authMiddleware";
import hashMiddleware from "./middleware/hashMiddleware";
import upload from "./middleware/multerMiddleware";

import { verifyToken } from "./middleware/jwtMiddleware";
/** Auth */
import authAction from "./modules/auth/authAction";
import postActions from "./modules/post/postActions";
import userActions from "./modules/user/userActions";

router.post("/api/register", hashMiddleware.hashPwd, authAction.register);
router.post(
  "/api/login",
  authMiddleware.isRegistered,
  hashMiddleware.verifyPwd,
  authAction.login,
);

//  Toutes les routes suivantes nécessitent un token valide
router.use(verifyToken as express.RequestHandler);

router.post("/api/logout", authAction.logout);

/**
 * User routes
 */
router.get("/api/me", userActions.me);
router.put("/api/me", upload, userActions.updateMe);
router.put(
  "/api/me/password",
  authMiddleware.isRegistered,
  hashMiddleware.verifyPwd,
  hashMiddleware.hashResetPwd,
  userActions.updateMePassword,
);

/**
 * Publications routes
 */
router.post("/api/posts", postActions.createPost);
router.get("/api/posts", postActions.browse);
router.get("/api/posts/:id", postActions.read);

/**
 * Admin routes
 */
router.get("/api/admin/users", userActions.browseAdmin);

/* ************************************************************************* */

export default router;
