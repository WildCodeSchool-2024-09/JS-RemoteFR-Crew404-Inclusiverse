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

/** Comments */
import commentAction from "./modules/comment/commentAction";

/** Likes */
import likeAction from "./modules/like/likeAction"; //

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

/** Routes pour les commentaires */
router.post("/api/comments", commentAction.addComment);
router.get(
  "/api/publications/:publication_id/comments",
  commentAction.getComments,
); // Récupérer les commentaires d'un post

/** Routes pour les likes */
router.post("/api/likes", likeAction.toggleLike); // ✅ Ajouter / retirer un like
router.get("/api/publications/:publication_id/likes", likeAction.getLikeCount); // ✅ Récupérer le nombre de likes d'un post

/* ************************************************************************* */

export default router;
