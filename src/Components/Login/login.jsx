// src/components/Login.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      function generateRandomString(length) {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
        return result;
      }
      // Replace 'YOUR_BACKEND_LOGIN_ENDPOINT' with the actual backend login endpoint.
      const client_id = "KMYvzwFdDvpecaPPyislaQ";
      const randomNum = generateRandomString(10);
      const redirect='http://localhost:3000/'
      const response = await axios.post(
        `https://www.reddit.com/api/v1/authorize?client_id=${client_id}&response_type=code&state=${randomNum}&redirect_uri=${redirect}&duration=permanent&scope=identity read`,
        {
          username,
          password,
        }
      );
      const accessToken = response.data.accessToken;
      // Save the access token to localStorage or a state management solution.
      localStorage.setItem("accessToken", accessToken);
      history.push("/home");
    } catch (error) {
      console.error(error);
      // Handle login error here
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
