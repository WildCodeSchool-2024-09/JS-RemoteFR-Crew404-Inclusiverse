import "./Card.css";

interface CardProps {
  title: string;
  content: string;
  author: string;
  timestamp: string;
}

const Card: React.FC<CardProps> = ({ title, content, author, timestamp }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
      <small>
        Posté par {author} - {new Date(timestamp).toLocaleString()}
      </small>
    </div>
  );
};

export default Card;
