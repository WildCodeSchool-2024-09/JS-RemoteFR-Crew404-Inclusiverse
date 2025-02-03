import type { RequestHandler } from "express";
import commentRepository from "./commentRepository";

/**
 * Ajouter un commentaire à une publication
 */
const addComment: RequestHandler = async (req, res, next) => {
  try {
    // Vérification si l'utilisateur est authentifié
    if (!req.user) {
      res.status(401).json({ message: "Utilisateur non authentifié" });
      return;
    }

    // Vérification si le contenu du commentaire est valide
    if (!req.body.content || req.body.content.trim() === "") {
      res.status(400).json({ message: "Le commentaire ne peut pas être vide" });
      return;
    }

    const commentId = await commentRepository.create({
      publication_id: req.body.publication_id,
      user_id: req.user.id,
      content: req.body.content,
    });

    res.status(201).json({ message: "Commentaire ajouté", commentId });
  } catch (error) {
    next(error);
  }
};

/**
 * Récupérer les commentaires d'une publication
 */
const getComments: RequestHandler = async (req, res, next) => {
  try {
    const comments = await commentRepository.getByPublication(
      Number(req.params.publication_id),
    );
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export default { addComment, getComments };
