import { useNavigate } from "react-router-dom";

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
    <>
      <h1>You are already logged in mate!</h1>
      <button onClick={() => handeLogout()}>Logout</button>
      <button onClick={handleHomeClick}>Home</button>
    </>
  );
}

export default AlreadyLoggedIn;
