import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CheckAuth from "./util/CheckAuth";
import Guest from "./util/Guest";
import Categories from "./pages/Categories";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <CheckAuth>
            <Dashboard />
          </CheckAuth>
        ),
      },
      {
        path: "/categories",
        element: (
          <CheckAuth>
            <Categories />
          </CheckAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <Guest>
            <Login />
          </Guest>
        ),
      },
      {
        path: "/register",
        element: (
          <Guest>
            <Signup />
          </Guest>
        ),
      },
    ],
  },
]);

export default router;
