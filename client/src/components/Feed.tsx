import { useState } from "react";
import CreateAnnouncement from "./CreateAnnouncement";
import Card from "./card";

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
}

const Feed: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const addAnnouncement = (announcement: Omit<Announcement, "id">) => {
    const newAnnouncement = {
      ...announcement,
      id: crypto.randomUUID(),
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  };

  return (
    <div>
      <CreateAnnouncement onAddAnnouncement={addAnnouncement} />
      <div className="feed">
        {announcements.map((announcement) => (
          <Card
            key={announcement.id}
            title={announcement.title}
            content={announcement.content}
            author={announcement.author}
            timestamp={announcement.timestamp}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
