import { useState } from "react";
import Card from "./Card/Card";
import CreateAnnouncement from "./CreateAnnouncement";

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
}

function Feed() {
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
}

export default Feed;
