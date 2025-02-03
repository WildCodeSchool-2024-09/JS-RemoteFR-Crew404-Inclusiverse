import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
};

class UserRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the User
    return rows[0] as User;
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
      values,
    );

    return result.affectedRows;
  }

  async updatePassword(id: number, password: string) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET password = ? WHERE id = ?",
      [password, id],
    );

    return result.affectedRows;
  }
}

export default new UserRepository();
