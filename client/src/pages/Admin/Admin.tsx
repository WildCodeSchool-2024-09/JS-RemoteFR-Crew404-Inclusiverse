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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/api/admin/users");
        setUsers(data as UserApi[]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="admin-container">
      <h2>Liste des utilisateurs</h2>
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
                  <button className="edit-btn" type="button">
                    <FaRegEdit />
                  </button>
                  <button className="delete-btn" type="button">
                    <FaRegTrashCan />
                  </button>
                  <button className="admin-btn" type="button">
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
