import { useState } from "react";
import type React from "react";

interface CreateAnnouncementProps {
  onAddAnnouncement: (announcement: {
    title: string;
    content: string;
    author: string;
    timestamp: string;
  }) => void;
}

const CreateAnnouncement: React.FC<CreateAnnouncementProps> = ({
  onAddAnnouncement,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAnnouncement({
      title,
      content,
      author: "Utilisateur",
      timestamp: new Date().toISOString(),
    });
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre de l'annonce"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Contenu de l'annonce"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Publier</button>
    </form>
  );
};

export default CreateAnnouncement;
