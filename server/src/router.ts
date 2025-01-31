import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

/** Middleware */
import authMiddleware from "./middleware/authMiddleware";
import hashMiddleware from "./middleware/hashMiddleware";

import { verifyToken } from "./middleware/jwtMiddleware";
/** Auth */
import authAction from "./modules/auth/authAction";

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

/* ************************************************************************* */

export default router;
