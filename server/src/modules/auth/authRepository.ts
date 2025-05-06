import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role_id: number;
};

class AuthRepository {
  // Create operation - Inscription d'un utilisateur
  async create(user: Omit<User, "id">): Promise<number> {
    try {
      // Exécute une requête INSERT pour ajouter un nouvel utilisateur
      const [result] = await databaseClient.query<Result>(
        "INSERT INTO user (email, password, name, lastname, avatar) VALUES (?, ?, ?, ?, ?)",
        [
          user.email,
          user.password,
          user.firstname,
          user.lastname,
          "default.jpg",
        ],
      );

      // Retourne l'ID de l'utilisateur nouvellement inséré
      return result.insertId;
    } catch (error) {
      console.error("Error in create:", error);
      throw new Error("Unable to create user");
    }
  }

  // Read operation - Lire un utilisateur spécifique
  async read(email: string): Promise<User | null> {
    try {
      // Exécute une requête SELECT pour récupérer un utilisateur par son ID
      const [rows] = await databaseClient.query<Rows>(
        "SELECT * FROM user WHERE email = ?",
        [email],
      );

      // Retourne le premier utilisateur trouvé ou null si aucun utilisateur
      return rows[0] as User | null;
    } catch (error) {
      console.error("Error in read:", error);
      throw new Error("Unable to read user");
    }
  }

  // Read all operation - Lire tous les utilisateurs
  async readAll(): Promise<User[]> {
    try {
      // Exécute une requête SELECT pour récupérer tous les utilisateurs
      const [rows] = await databaseClient.query<Rows>("SELECT * FROM user");

      // Retourne la liste des utilisateurs
      return rows as User[];
    } catch (error) {
      console.error("Error in readAll:", error);
      throw new Error("Unable to read all users");
    }
  }

  // Update operation - Mise à jour d'un utilisateur
  async update(user: User): Promise<void> {
    try {
      // Exécute une requête UPDATE pour modifier un utilisateur existant
      await databaseClient.query(
        "UPDATE user SET email = ?, password = ? WHERE id = ?",
        [user.email, user.password, user.id],
      );
    } catch (error) {
      console.error("Error in update:", error);
      throw new Error("Unable to update user");
    }
  }

  // Delete operation - Suppression d'un utilisateur
  async delete(id: number): Promise<void> {
    try {
      // Exécute une requête DELETE pour supprimer un utilisateur par son ID
      await databaseClient.query("DELETE FROM user WHERE id = ?", [id]);
    } catch (error) {
      console.error("Error in delete:", error);
      throw new Error("Unable to delete user");
    }
  }
}

export default new AuthRepository();
