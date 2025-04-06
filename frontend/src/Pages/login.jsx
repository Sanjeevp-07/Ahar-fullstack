import React, { useState } from "react";
import "./CSS/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/delivery-auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login Successful!");

        navigate("/delivery/DeliveryOrders");

        window.location.href = "/delivery/DeliveryOrders"; // Redirect to dashboard
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container2">
      <h2>
        <span className="highlight">AHAR</span> LOGIN
      </h2>
      <div className="user-icon">👤</div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
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
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
