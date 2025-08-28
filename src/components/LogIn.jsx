import { useEffect, useState } from "react";
const signUpUrl = "http://localhost:3000" + "/log-in";
import { useNavigate } from "react-router";

let didInit = false;

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");
  const [errors, setErrors] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!didInit) {
      if (token) {
        navigate("/already-logged-in");
        return;
      }
    }
  }, []);

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
      setErrors(data);
    } else {
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/");
    }
  }
  return (
    <>
      {errors !== null && errors.message}
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

        <button>Submit</button>
      </form>
    </>
  );
}

export default LogIn;
