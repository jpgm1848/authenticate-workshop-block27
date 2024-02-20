import { useState } from "react";

function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setSuccessMessage(result.message);
      setUser(result.data.username);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <h2 className="authenticateHeader">Authenticate</h2>
      <div className="authenticateResults">
        {successMessage && <p>{successMessage}</p>}
        {user && <p>Username is: {user}</p>}
        {error && <p>{error}</p>}
      </div>
      <button onClick={handleClick}>Autheticate Token</button>
    </>
  );
}

export default Authenticate;
