import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const { APP_SECRET } = process.env;

const createToken = (user: { id: number; email: string }) => {
  if (!APP_SECRET) throw new Error("APP_SECRET is not defined");
  return jwt.sign(user, APP_SECRET, { expiresIn: "1h" });
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (!APP_SECRET) throw new Error("APP_SECRET is not defined");
  const token = req.cookies?.token;

  if (!token) {
    return res.status(403).json({ message: "Token manquant, accès refusé" });
  }

  try {
    const decoded = jwt.verify(token, APP_SECRET);
    req.user = decoded as { id: number; email: string; password: string };
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

export { createToken, verifyToken };
