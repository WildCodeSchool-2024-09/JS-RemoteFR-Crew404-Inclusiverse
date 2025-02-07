import { useState } from "react";
import Feed from "./components/Feed/Feed";
import Post from "./components/Post/Post";

function App() {
  const [isPost, setIsPost] = useState<boolean>(false);

  const handlePost = () => {
    setIsPost(!isPost);
  };

  return (
    <section>
      <h1>Bienvenue sur Inclusiverse</h1>
      <Post handlePost={handlePost} />
      <Feed isPost={isPost} />
    </section>
  );
}

export default App;
