import { useState } from "react";
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
    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/");
    }
  }
  return (
    <>
      {errors.length > 0 && (
        <>
          <ul>
            {errors.map((currError) => {
              return <li>{currError.msg}</li>;
            })}
          </ul>
        </>
      )}
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassowrd(e.target.value)}
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

export default SignUp;
