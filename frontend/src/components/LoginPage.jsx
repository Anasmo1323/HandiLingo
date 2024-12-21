import httpClient from "./httpClient";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const logInUser = async () => {
    try {
      const resp = await httpClient.post("/login", {
        email,
        password,
      });

      alert("Logged in successfully1");
      navigate('/');
      alert("Logged in successfully2");
    } catch (error) {
      if (error.response.status === 440) {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div>
      <form>
        <div>
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={() => logInUser()}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginPage;