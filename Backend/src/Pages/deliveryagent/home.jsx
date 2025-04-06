import React, { useEffect, useState } from "react";
import "./home.css";
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Username: ${formData.username}, Remember Me: ${formData.remember}`);
  };

  return (
    <div className="login-container">
      <h2>
        <span className="highlight">AHAR</span> LOGIN
      </h2>
      <div className="user-icon">👤</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className="remember-me">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            id="remember"
          />
          <label htmlFor="remember">Remember Me</label>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Login;
