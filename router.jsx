import Home from "./src/components/Home";
import SignUp from "./src/components/SignUp";
import LogIn from "./src/components/LogIn";
import PostPage from "./src/components/PostPage";
import { createBrowserRouter } from "react-router-dom";
import AlreadyLoggedIn from "./src/components/AlreadyLoggin";
import ExpandedPost from "./src/components/ExpandedPost";

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
  {
    path: "/posts",
    element: <PostPage />,
  },
  {
    path: "/posts/:postId",
    element: <ExpandedPost />,
  },
]);

export { router };
