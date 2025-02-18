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

    // Je parse mon body, a cause de multer et du FormData.
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
      req.body.password
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

const browseAdmin: RequestHandler = async (req, res, next) => {
  try {
    // Si je n'ai pas de req.user (user authentifier)
    if (!req.user) {
      // Error 401
      res.sendStatus(401);
      return;
    }

    // Si je n'ai pas le role id: 1
    if (req.user.role_id !== 1) {
      // Error 403
      res.sendStatus(403);
      return;
    }

    const users = await userRepository.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const deleteAdminUser: RequestHandler = async (req, res, next) => {
  try {
    // Si je n'ai pas de req.user (user authentifier)
    if (!req.user) {
      // Error 401
      res.sendStatus(401);
      return;
    }

    // Si je n'ai pas le role id: 1
    if (req.user.role_id !== 1) {
      // Error 403
      res.sendStatus(403);
      return;
    }

    /**
     * Récuperer l'id passé en parametre (req.params.id)
     * Créer un repository pour delete l'utilisateur
     * Envoyer la réponse comme quoi c'est bien delete
     */

    // Récuperer l'id passé en parametre (req.params.id)
    const userId = req.params.id;

    // Créer un repository pour delete l'utilisateur
    const deletedUser = await userRepository.delete(+userId);

    if (!deletedUser) {
      res.sendStatus(404);
      return;
    }

    // Envoyer la réponse comme quoi c'est bien delete
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    next(err);
  }
};

const updateAdminUser: RequestHandler = async (req, res, next) => {
  try {
    // Vérifier que l'utilisateur connecté existe
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    // Vérifier que l'utilisateur connecté est un administrateur (role_id === 1)
    if (req.user.role_id !== 1) {
      res.sendStatus(403);
      return;
    }

    // Récupérer l'ID de l'utilisateur à mettre à jour depuis les paramètres de l'URL
    const userId = Number(req.params.id);

    // Récupérer les données de mise à jour depuis le corps de la requête
    // Ici, on attend que le body contienne directement les champs à mettre à jour (ex: name, lastname, email, etc.)
    const updatedData = req.body;

    // Appeler le repository pour effectuer la mise à jour
    const affectedRows = await userRepository.update(userId, updatedData);

    // Si aucune ligne n'a été affectée, l'utilisateur n'a pas été trouvé
    if (affectedRows === 0) {
      res.sendStatus(404);
      return;
    }

    // Renvoyer une réponse indiquant que l'utilisateur a été mis à jour
    res.json({ message: "Utilisateur mis à jour avec succès" });
  } catch (err) {
    next(err);
  }
};
export default {
  me,
  updateMe,
  updateMePassword,
  browseAdmin,
  deleteAdminUser,
  updateAdminUser,
};
