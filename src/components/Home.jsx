import { Link, Outlet } from "react-router-dom";
import styles from "./Home.module.css";
function Home() {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <h1>Blog App</h1>
        <div className={styles.linkContainer}>
          <Link to="/sign-up" className={styles.linkEle}>
            Sign-Up
          </Link>
          <Link to="/log-in" className={styles.linkEle}>
            Log-in
          </Link>
          <Link to="/posts" className={styles.linkEle}>
            PostPage
          </Link>
        </div>
      </header>
      <Outlet></Outlet>
    </div>
  );
}

export default Home;
