import * as argon2 from "argon2";
import type { NextFunction, Request, Response } from "express";

/**
 * Le middleware hashPwd permet de hasher le mot de passe avant de l'ajouter à la base de données.
 */
const hashPwd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hash = await argon2.hash(req.body.password);
    req.body.password = hash;
    next();
  } catch (error) {
    console.error("Error in hashPwd:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Le middleware verifyPwd permet de vérifier si le mot de passe est correct.
 */
const verifyPwd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
      return;
    }

    const isCorrect = await argon2.verify(user.password, req.body.password);
    if (!isCorrect) {
      res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
      return;
    }

    next();
  } catch (error) {
    console.error("Error in verifyPwd:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { hashPwd, verifyPwd };
