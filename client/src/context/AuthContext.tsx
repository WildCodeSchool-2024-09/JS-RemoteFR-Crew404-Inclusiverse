// Objective: Create a context to handle the theme of the app
import { createContext, useContext, useState } from "react";
import { success } from "../services/toast";
import type { UserType } from "../types/User";

type AuthContextType = {
  user: UserType | null;
  handleLogin: (user: UserType) => void;
  handleLogout: () => void;
};

// Create a context for the theme
const AuthContext = createContext<AuthContextType | null>(null);

type ChildrenType = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: ChildrenType) => {
  // Provide the current theme to the entire app
  const [user, setUser] = useState<UserType | null>(null);

  const handleLogin = (user: UserType) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
    success("Vous avez été déconnecté");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create custom hook to use the theme
export const useAuth = () => {
  const theme = useContext(AuthContext);
  if (!theme) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return theme;
};
