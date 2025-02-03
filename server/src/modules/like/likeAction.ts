import type { RequestHandler } from "express";
import likeRepository from "./likeRepository";

/**
 * Liker ou unliker une publication
 */
const toggleLike: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    const liked = await likeRepository.toggleLike(
      req.body.publication_id,
      req.user.id,
    );

    res.json({ message: "Like bien pris en comtpe" });
  } catch (error) {
    next(error);
  }
};

/**
 * Récupérer le nombre de likes d'une publication
 */
const getLikeCount: RequestHandler = async (req, res, next) => {
  try {
    const likeCount = await likeRepository.countLikes(
      Number(req.params.publication_id),
    );
    res.json({ likeCount });
  } catch (error) {
    next(error);
  }
};

export default { toggleLike, getLikeCount };
