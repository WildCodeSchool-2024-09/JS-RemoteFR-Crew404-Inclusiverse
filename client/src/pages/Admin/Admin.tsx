import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Admin.css"; // Import du fichier CSS
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";

interface UserApi {
  created_at: string;
  email: string;
  id: number;
  lastname: string;
  name: string;
  role: string;
  publication_count: number;
}

function Admin() {
  const [users, setUsers] = useState<UserApi[]>([]);
  const [editingUser, setEditingUser] = useState<UserApi | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedLastname, setUpdatedLastname] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Récupérer la liste des utilisateurs depuis le backend
  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/api/admin/users");
      setUsers(data as UserApi[]);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
    }
  };

  // Gérer l'édition d'un utilisateur : remplir le formulaire avec les infos actuelles
  const handleEditClick = (user: UserApi) => {
    setEditingUser(user);
    setUpdatedName(user.name);
    setUpdatedLastname(user.lastname);
    setUpdatedEmail(user.email);
  };

  // Envoyer les modifications de l'utilisateur au backend
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      // Remplacez "user" par "users" pour correspondre à votre route
      await api.put(`/api/admin/users/${editingUser.id}`, {
        name: updatedName,
        lastname: updatedLastname,
        email: updatedEmail,
      });
      setEditingUser(null);
      fetchUsers(); // Rafraîchir la liste après modification
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  // Supprimer un utilisateur
  const handleDelete = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?"))
      return;
    try {
      await api.delete(`/api/admin/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  // Upgrader l'utilisateur en admin via l'endpoint dédié (par exemple, en mettant à jour role_id à 1)
  const handleUpgrade = async (id: number) => {
    try {
      await api.put(`/api/admin/users/${id}/upgrade`);
      fetchUsers(); // Rafraîchir la liste après l'upgrade
      alert("Utilisateur mis à jour vers admin avec succès");
    } catch (error) {
      console.error("Erreur lors de l'upgrade :", error);
      alert("Erreur lors de l'upgrade de l'utilisateur.");
    }
  };

  return (
    <section className="admin-container">
      <h2>Liste des utilisateurs</h2>

      {/* Formulaire d'édition affiché si un utilisateur est sélectionné */}
      {editingUser && (
        <div className="edit-user-form">
          <h3>Modifier l'utilisateur</h3>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              placeholder="Nom"
            />
            <input
              type="text"
              value={updatedLastname}
              onChange={(e) => setUpdatedLastname(e.target.value)}
              placeholder="Prénom"
            />
            <input
              type="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              placeholder="Email"
            />
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={() => setEditingUser(null)}>
              Annuler
            </button>
          </form>
        </div>
      )}

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Date inscription</th>
              <th>Nb post</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>{user.publication_count}</td>
                <td>{user.role}</td>
                <td className="actions-btn">
                  <button
                    className="edit-btn"
                    type="button"
                    onClick={() => handleEditClick(user)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaRegTrashCan />
                  </button>
                  {/* Bouton pour upgrader l'utilisateur en admin */}
                  <button
                    className="admin-btn"
                    type="button"
                    onClick={() => handleUpgrade(user.id)}
                  >
                    <RiAdminLine />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Admin;
