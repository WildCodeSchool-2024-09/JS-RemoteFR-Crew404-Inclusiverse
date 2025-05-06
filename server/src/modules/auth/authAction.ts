import type { RequestHandler } from "express";
import { createToken } from "../../middleware/jwtMiddleware";

// Import access to data
import authRepository from "./authRepository";

/**
 * La méthode register permet de créer un nouvel utilisateur.
 */
const register: RequestHandler = async (req, res, next) => {
  try {
    // Je crée un nouvel utilisateur
    const user = await authRepository.create(req.body);

    // J'informe l'utilisateur que son compte a été créé
    res.json({ message: "Compte créé" });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

/**
 * Le login permet à un utilisateur de se connecter.
 * Celui doit être enregistré dans la base de données.
 * Si l'utilisateur n'est pas enregistré, il renvoie une erreur 401.
 * Sinon il crée un token et le renvoie.
 */
const login: RequestHandler = async (req, res, next) => {
  try {
    // Vérification de l'utilisateur
    if (!req.user) {
      res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
      return;
    }
    // Création du token
    const token = createToken({
      id: req.user.id,
      email: req.user.email,
      role_id: req.user.role_id,
    });

    // Suppréssion du mot de passe
    // Partial permet de rendre les propriétés de l'objet optionnelles
    const user: Partial<typeof req.user> = req.user;
    if (user.password) {
      // Il est impossible d'utiliser delete sur un objet typé
      // Du coup on utilise undefined pour supprimer la propriété
      user.password = undefined;
    }

    // Envoi du token et de l'utilisateur
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * La méthode logout permet à un utilisateur de se déconnecter.
 */
const logout: RequestHandler = async (req, res, next) => {
  try {
    // Suppression du token
    res.clearCookie("token").json({ message: "Déconnecté" });
  } catch (err) {
    next(err);
  }
};

export default { register, login, logout };
