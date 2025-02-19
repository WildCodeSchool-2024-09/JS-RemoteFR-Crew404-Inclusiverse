// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import About from "./pages/About/About";
import ConnexionPage from "./pages/Connexion/ConnexionPage";
import InscriptionPage from "./pages/Inscription/InscriptionPage";
import Layout from "./pages/Layout/Layout";
import NotFound from "./pages/NotFound/NotFound";
import Profil from "./pages/Profil/Profil";

// Import CSS
import "./App.css";

import { AuthProvider } from "./context/AuthContext";
// Import ThemeProvider
import { ThemeProvider } from "./context/ThemeContext";
import Admin from "./pages/Admin/Admin";
import AdminRoute from "./pages/AdminRoute";
import ProtectedRoute from "./pages/ProtectedRoute";
import api from "./services/api";

/* ************************************************************************* */
// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <Layout />, // Renders the App component for the home page
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/",
        element: <ConnexionPage />,
      },
      {
        path: "/inscription",
        element: <InscriptionPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <App />,
          },
          {
            path: "/profil",
            element: <Profil />,
            loader: async () => {
              try {
                const response = await api.get("/api/me");
                return response.data;
              } catch (error) {
                console.error("Erreur lors du chargement du profil :", error);
                return null; // Ou rediriger vers ConnexionPage
              }
            },
          },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          {
            path: "/admin",
            element: <Admin />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
