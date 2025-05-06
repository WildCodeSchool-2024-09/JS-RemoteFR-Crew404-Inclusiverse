import type { NextFunction, Request, Response } from "express";
import authRepository from "../modules/auth/authRepository";

/**
 * Le middleware isRegistered vérifie si l'utilisateur est enregistré dans la base de données.
 * Si l'utilisateur n'est pas enregistré, il renvoie une erreur 401.
 * Sinon
 */
const isRegistered = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = await authRepository.read(req.body.email);
  if (!user) {
    res.status(401).json({ message: "Email ou mot de passe incorrect" });
    return;
  }

  req.user = user;
  next();
};

export default { isRegistered };
