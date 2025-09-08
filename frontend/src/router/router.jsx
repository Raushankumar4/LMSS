import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterForm from "../components/Auth/RegisterUser";
import LoginForm from "../components/Auth/Login";
import Admin from "../components/Admin/Admin";

export const router = createBrowserRouter([
  {
    path: "/signUp",
    element: <RegisterForm />,
  },
  {
    path: "/signIn",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Admin /> }],
  },
]);
