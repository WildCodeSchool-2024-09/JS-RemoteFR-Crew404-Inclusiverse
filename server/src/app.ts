import cookieParser from "cookie-parser"; //  Ajout du cookie-parser
import cors from "cors";
import express from "express";

const app = express();

/* ************************************************************************* */

//  Configuration de CORS pour permettre les cookies
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, //  Permet aux cookies d’être envoyés
  }),
);

//  Activation des middlewares pour parser les requêtes
app.use(express.json());

//  Middleware pour gérer les cookies
app.use(cookieParser());

/* ************************************************************************* */

// Import du routeur
import router from "./router";

// Ci dessous, nous préxifions toutes les routes avec "/api"
// app.use("/api", router);

app.use(router);

/* ************************************************************************* */

// Gestion des fichiers statiques pour le client
import fs from "node:fs";
import path from "node:path";

const publicFolderPath = path.join(__dirname, "../../server/public");

if (fs.existsSync(publicFolderPath)) {
  app.use(express.static(publicFolderPath));
}

/**
 * Gestion des fichiers statiques pour les uploads
 */
const uploadsFolderPath = path.join(__dirname, "../../server/uploads");

if (fs.existsSync(uploadsFolderPath)) {
  app.use("/uploads", express.static(uploadsFolderPath));
}

const clientBuildPath = path.join(__dirname, "../../client/dist");

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  // Rediriger les requêtes non gérées vers React (SPA)
  app.get("*", (_, res) => {
    res.sendFile("index.html", { root: clientBuildPath });
  });
}

/* ************************************************************************* */

//  Middleware pour gérer les erreurs
import type { ErrorRequestHandler } from "express";

const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  console.error("on req:", req.method, req.path);
  next(err);
};

app.use(logErrors);

/* ************************************************************************* */

export default app;
