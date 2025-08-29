import Home from "./src/components/Home";
import SignUp from "./src/components/SignUp";
import LogIn from "./src/components/LogIn";
import PostPage from "./src/components/PostPage";
import { createBrowserRouter } from "react-router-dom";
import AlreadyLoggedIn from "./src/components/AlreadyLoggin";
import ExpandedPost from "./src/components/ExpandedPost";
import HomePageContent from "./src/components/HomePageContent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
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
      {
        index: true,
        element: <HomePageContent />,
      },
    ],
  },
]);

export { router };
