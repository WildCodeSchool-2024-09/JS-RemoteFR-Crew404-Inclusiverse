import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import api from "../../services/api";
import AdminEditPublication from "./AdminEditPublication";

interface Publication {
  id: number;
  contenu: string;
  created_at: string;
  author: { name: string };
}

const AdminPublications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const { data } = await api.get<Publication[]>("/api/admin/publications");
      setPublications(data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  const handleEditClick = (publication: Publication) => {
    setSelectedPublication(publication);
  };

  const handleDelete = async (publication: Publication) => {
    if (!window.confirm("Voulez-vous supprimer cette publication ?")) return;

    try {
      await api.delete(`/api/admin/publication/${publication.id}`);
      setPublications(publications.filter((p) => p.id !== publication.id));
    } catch (error) {
      console.error("Erreur de suppression :", error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Gestion des publications</h2>

      {selectedPublication && (
        <AdminEditPublication
          publication={selectedPublication}
          onClose={() => setSelectedPublication(null)}
          onSave={fetchPublications}
        />
      )}

      <table className="user-table">
        <thead>
          <tr>
            <th>Auteur</th>
            <th>Contenu</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((pub) => (
            <tr key={pub.id}>
              <td>{pub.author.name}</td>
              <td>{pub.contenu}</td>
              <td>{new Date(pub.created_at).toLocaleDateString()}</td>
              <td className="actions-btn">
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => handleEditClick(pub)}
                >
                  <FaRegEdit />
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDelete(pub)}
                >
                  <FaRegTrashCan />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPublications;
