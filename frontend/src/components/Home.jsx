import { useState, useEffect } from "react";
import httpClient from "./httpClient";

function Home() {
  const [user, setUser] = useState(null);

  const logoutUser = async () => {
    await httpClient.post("/logout");
    setUser(null); // Ensure user state is cleared
    window.location.href = "/"; // Redirect to homepage after logout
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("/@me");
        setUser(resp.data); // Set user data if authenticated
      } catch (error) {
        setUser(null); // Set user to null if not authenticated
        console.log("Not authenticated");
      }
    })();
  }, []); // This effect runs once on component mount

  return (
    <div>
      <h1>Welcome to this React Application</h1>
      {user ? (
        // When user is logged in
        <div>
          <h2>Logged In</h2>
          <h3>ID: {user.id}</h3>
          <h3>Email: {user.email}</h3>
          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        // When no user session exists
        <div>
          <p>You are not logged in</p>
          <div>
            <a href="/login">
              <button>Login</button>
            </a>
            <a href="/register">
              <button>Register</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
