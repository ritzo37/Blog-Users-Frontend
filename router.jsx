import Home from "./src/components/Home";
import SignUp from "./src/components/SignUp";
import LogIn from "./src/components/LogIn";
import { createBrowserRouter } from "react-router-dom";
import AlreadyLoggedIn from "./src/components/AlreadyLoggin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/log-in",
    element: <LogIn />,
  },
  {
    path: "/already-logged-in",
    element: <AlreadyLoggedIn />,
  },
]);

export { router };
