import "./Card.css";

interface CardProps {
  title: string;
  content: string;
  author: string;
  timestamp: string;
}

function Card({ title, content, author, timestamp }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
      <small>
        Posté par {author} - {new Date(timestamp).toLocaleString()}
      </small>
    </div>
  );
}

export default Card;
