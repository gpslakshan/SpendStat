import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Signup from "./pages/Signup.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
