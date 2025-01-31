import * as argon2 from "argon2";
import type { NextFunction, Request, Response } from "express";

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

const verifyPwd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      const isCorrect = await argon2.verify(
        req.user.password,
        req.body.password,
      );

      if (isCorrect) {
        next();
      } else {
        res.status(401).json({
          message: "Email ou mot de passe incorrect",
        });
        return;
      }
    } else {
      res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
      return;
    }
  } catch (error) {
    console.error("Error in verifyPwd:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { hashPwd, verifyPwd };
