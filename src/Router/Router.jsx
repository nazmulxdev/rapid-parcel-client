import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import LogIn from "../Pages/Authentication/LogIn";
import Register from "../Pages/Authentication/Register";
import Coverage from "../Pages/Coverage/Coverage";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: LogIn,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);

export default Router;
