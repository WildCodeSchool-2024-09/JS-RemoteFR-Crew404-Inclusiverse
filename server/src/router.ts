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

import authMiddleware from "./middleware/hashPwd";

/** Auth */
import authAction from "./modules/auth/authAction";

router.post("/api/login", authAction.login);
router.post("/api/register", authMiddleware.hashPwd, authAction.register);

/* ************************************************************************* */

export default router;
