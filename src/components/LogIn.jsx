import { useEffect, useState } from "react";
const signUpUrl = "http://localhost:3000" + "/log-in";
import { useNavigate } from "react-router";
import styles from "./Login.module.css";
let didInit = false;

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!didInit) {
      if (token) {
        navigate("/already-logged-in");
        return;
      }
    }
  }, [navigate]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const response = await fetch(signUpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
    } else {
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/");
    }
  }
  return (
    <>
      <h1 className={styles.heading}>Login </h1>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        {error.length > 0 && (
          <>
            <p className={styles.errorContainer}>{error}</p>
          </>
        )}
        <div>
          <label htmlFor="name">
            Name
            <input
              className={styles.inputFields}
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              className={styles.inputFields}
              type="password"
              value={password}
              required
              onChange={(e) => setPassowrd(e.target.value)}
            />
          </label>

          <button className={styles.button}>Submit</button>
        </div>
      </form>
    </>
  );
}

export default LogIn;
