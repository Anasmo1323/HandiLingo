import { useState } from "react";
import httpClient from "./httpClient";

function RegisterPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const resp = await httpClient.post("/register", {
        name,
        age,
        email,
        password,
      });

      alert("Registration successful! Redirecting to login...");
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("All fields are required!");
      } else if (error.response && error.response.status === 409) {
        alert("User already exists!");
      } else {
        alert("An error occurred during registration.");
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Age: </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
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
        <button type="button" onClick={registerUser}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
