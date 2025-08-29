import { useNavigate } from "react-router-dom";
import styles from "./AlreadyLoggin.module.css";
function AlreadyLoggedIn() {
  let navigate = useNavigate();
  function handeLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }
  function handleHomeClick() {
    navigate("/");
  }
  return (
    <div className={styles.container}>
      <h1>You are already logged in!</h1>
      <div className={styles.buttonContainer}>
        {" "}
        <button className={styles.button} onClick={() => handeLogout()}>
          Logout
        </button>
        <button className={styles.button} onClick={handleHomeClick}>
          Home
        </button>
      </div>
    </div>
  );
}

export default AlreadyLoggedIn;
