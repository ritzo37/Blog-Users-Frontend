import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Hello Welcome to my app !</h1>
      <Link to="/sign-up">Sign-Up</Link>
      <Link to="/log-in">Log-in</Link>
      <Link to="/posts">PostPage</Link>
    </>
  );
}

export default Home;
