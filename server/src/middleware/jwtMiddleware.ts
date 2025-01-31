import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * APP_SECRET est une variable d'environnement qui contient la clé secrète pour générer le token.
 */
const { APP_SECRET } = process.env;
// Si APP_SECRET n'est pas défini, on renvoie une erreur.
if (!APP_SECRET) {
  throw new Error(
    "APP_SECRET is not defined. Please set it in your environment variables.",
  );
}

// Génération du token
const createToken = (user: { id: number; email: string }): string => {
  return jwt.sign(user, APP_SECRET, { expiresIn: "1h" });
};

// Vérification du token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(403)
      .json({ message: "Information manquante, accès refusé" });
  }

  try {
    const decoded = jwt.verify(token, APP_SECRET) as {
      id: number;
      email: string;
      password: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Information invalide ou expiré" });
  }
};

export { createToken, verifyToken };
