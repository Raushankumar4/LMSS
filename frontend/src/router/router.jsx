import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterForm from "../components/Auth/RegisterUser";
import LoginForm from "../components/Auth/Login";
import Admin from "../components/Admin/Admin";
import BorrowRequests from "../components/Admin/BorrowRequests";
import Books from "../components/Books/Books";
import UserBorrowRequest from "../components/Books/UserBorrowRequest";

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
    children: [
      { index: true, element: <Admin /> },
      {
        path: "/borrow-requests",
        element: <BorrowRequests />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/my-borrow-requests",
        element: <UserBorrowRequest />,
      },
    ],
  },
]);
