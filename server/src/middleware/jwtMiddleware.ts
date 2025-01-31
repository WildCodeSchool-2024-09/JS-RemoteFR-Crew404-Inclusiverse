import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const jwtMiddleware = {
  verifyToken: (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(403).json({ message: "Token manquant, accès refusé" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded as { email: string; password: string };
      next();
    } catch (error) {
      res.status(401).json({ message: "Token invalide" });
    }
  },
};

export default jwtMiddleware;
