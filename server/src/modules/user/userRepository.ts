import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
};

class UserRepository {
  async readAll() {
    // Je vais récuperer tous mes utilisateurs ainsi que le nombre de publications qu'ils ont fait ainsi que son rôle
    const [rows] = await databaseClient.query<Rows>(
      `SELECT u.id, u.name, u.lastname, u.created_at, COUNT(p.id) as publication_count, r.name as role
			FROM user u
			LEFT JOIN publication p ON u.id = p.user_id
			JOIN role r ON u.role_id = r.id
			GROUP BY u.id`
    );

    return rows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id]
    );

    // Retourne le premier utilisateur trouvé
    return rows[0] as User;
  }

  async delete(id: number) {
    // Correction : utiliser la table "user" et récupérer le résultat de la suppression
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE id = ?",
      [id]
    );
    // Renvoie true si au moins une ligne a été supprimée, sinon false
    return result.affectedRows > 0;
  }

  async update(id: number, user: Partial<User>) {
    // Si l'objet user est vide, on ne peut pas mettre à jour
    if (Object.keys(user).length === 0) {
      throw new Error("Aucune donnée à mettre à jour");
    }

    // On récupère les clés de l'objet user, on les transforme en string
    const fields = Object.keys(user)
      .map((key) => `${key} = ?`)
      .join(", ");

    // On récupère les valeurs de l'objet user, on les transforme en tableau
    const values = [...Object.values(user), id];

    /**
     * On exécute la requête SQL pour mettre à jour l'utilisateur
     */
    const [result] = await databaseClient.query<Result>(
      `UPDATE user SET ${fields} WHERE id = ?`,
      values
    );

    return result.affectedRows;
  }

  async updatePassword(id: number, password: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET password = ? WHERE id = ?",
      [password, id]
    );

    return result.affectedRows;
  }
}

export default new UserRepository();
