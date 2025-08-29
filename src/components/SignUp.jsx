import { useState } from "react";
import styles from "./SignUp.module.css";
const signUpUrl = "http://localhost:3000" + "/sign-up";
import { useNavigate } from "react-router";
function SignUp() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  async function handleFormSubmit(e) {
    e.preventDefault();
    const response = await fetch(signUpUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, confirmPassword }),
    });
    const data = await response.json();
    console.log(data);
    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  }
  return (
    <>
      <h1 className={styles.heading}>Sign Up</h1>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        {errors.length > 0 && (
          <>
            <ul className={styles.ul}>
              {" "}
              {errors.map((currError) => {
                return <li className={styles.li}>{currError.msg}</li>;
              })}
            </ul>
          </>
        )}
        <div>
          <label htmlFor="name">
            Name
            <input
              type="text"
              value={username}
              id="name"
              className={styles.inputFields}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              value={password}
              className={styles.inputFields}
              onChange={(e) => setPassowrd(e.target.value)}
              id="password"
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              type="password"
              className={styles.inputFields}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
            />
          </label>
          <button className={styles.button}>Submit</button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
