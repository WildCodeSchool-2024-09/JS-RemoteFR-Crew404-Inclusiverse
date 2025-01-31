import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
// import itemActions from "./modules/item/itemActions";

// router.get("/api/items", itemActions.browse);
// router.get("/api/items/:id", itemActions.read);
// router.post("/api/items", itemActions.add);
/** Middleware */

import authMiddleware from "./middleware/authMiddleware";
import hashMiddleware from "./middleware/hashMiddleware";
import jwtMiddleware from "./middleware/jwtMiddleware";
/** Auth */
import authAction from "./modules/auth/authAction";

router.post("/api/login", authMiddleware.isRegistered, authAction.login);
router.post("/api/register", hashMiddleware.hashPwd, authAction.register);

/* ************************************************************************* */

export default router;
