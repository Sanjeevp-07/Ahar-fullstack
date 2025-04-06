import React, { useState } from 'react';
import './CSS/Login1.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login1 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login-user', {
        email,
        password
      });

       // Extract token and restaurant_id safely
      const { success, token, restaurant_id } = response.data;

      if (response.data.success) {
        toast.success(response.data.message || 'Login Successful');

       /*  const token = response.data.token;
        const restaurant_id = response.data.restaurant_id;  // Get restaurant_id from response
 */
        if (!token) {
          console.error("Token is missing!");
        } else {
          console.log("Token before storing:", token);
        }
        
        if (!restaurant_id) {
          console.error("Restaurant ID is missing!");
        } else {
          console.log("Restaurant ID before storing:", restaurant_id);
        }
        

        if (token && restaurant_id) {
          localStorage.setItem('token', token);
          localStorage.setItem('restaurant_id', restaurant_id);  // Store restaurant ID
          console.log('Stored Token:', localStorage.getItem('token'));
          console.log('Stored Restaurant ID:', localStorage.getItem('restaurant_id'));
          // Set the token in Axios for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          navigate('/');
        } else {
          toast.error('No token received, login failed.');
        }
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h1>Welcome to Ahar</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="right-panel">
        <form onSubmit={handleSubmit} className="login-box">
          <h2>User Login</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="fas fa-user"></i>
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="fas fa-lock"></i>
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login1;
