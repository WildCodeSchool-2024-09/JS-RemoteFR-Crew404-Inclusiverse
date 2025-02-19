import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function ProtectedRoute() {
  const { user } = useAuth(); // On récupère l'utilisateur connecté
  return <>{user ? <Outlet /> : <Navigate to="/" />}</>; // Si l'utilisateur est connecté, on affiche le composant enfant, sinon on redirige vers la page d'accueil
}

export default ProtectedRoute;
