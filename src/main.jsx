import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createHashRouter } from "react-router";
import Pokelist from "./pages/pokelist.jsx";
import About from "./pages/About.jsx";
import Pokemon from "./pages/Pokemon.jsx";
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Pokelist />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/Pokemon/:id",
        element: <Pokemon />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
