import React, { useEffect, useState } from "react";
import "./login_form.css";
import axios from "axios";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  // const fetchRandomBackgroundImg = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://source.unsplash.com/photos/random",
  //       {
  //         headers: {
  //           Authorization: `Client-ID ${accessKey}`,
  //         },
  //         params: {
  //           query: "technology",
  //           orientation: "landscape",
  //         },
  //       }
  //     );
  //     setBackgroundImg(response.data.urls.full);
  //   } catch (err) {
  //     console.error("Error fetching backgroung imagine: ", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchRandomBackgroundImg();

  //   const interval = setInterval(() => {
  //     fetchRandomBackgroundImg();
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div
      className="form-container"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="form-container">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <button type="submit">Login</button>
        </form>
        <a href="/create-user-account">Create an account</a>
      </div>
    </div>
  );
};

export default LoginForm;
