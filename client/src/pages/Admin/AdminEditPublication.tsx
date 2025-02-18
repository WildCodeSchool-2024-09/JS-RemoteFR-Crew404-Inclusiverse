import { useState } from "react";
import api from "../../services/api";

interface Props {
  publication: { id: number; contenu: string };
  onClose: () => void;
  onSave: () => void;
}

const AdminEditPublication = ({ publication, onClose, onSave }: Props) => {
  const [contenu, setContenu] = useState(publication.contenu);

  const handleSave = async () => {
    try {
      await api.put(`/api/admin/publication/${publication.id}`, { contenu });
      onSave();
      onClose();
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    }
  };

  return (
    <div className="edit-container">
      <h3>Modifier la publication</h3>
      <textarea value={contenu} onChange={(e) => setContenu(e.target.value)} />
      <div>
        <button type="button" onClick={handleSave}>
          Enregistrer
        </button>
        <button type="button" onClick={onClose}>
          Annuler
        </button>
      </div>
    </div>
  );
};

export default AdminEditPublication;
