import React, { useState } from "react";
import "./CSS/signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignupForm(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/delivery-auth/register", formData);
            alert(response.data.message);
        } catch (error) {
            alert("Error signing up: " + (error.response?.data?.message || "Something went wrong"));
        }
    };

    return (

        <div className="container">
            <h2 className="sticky-title">
                Create an <span className="highlight">Account</span>
            </h2>

            <form onSubmit={handleSubmit}>
                <label className="input-label">Name</label>
                <input
                    className="input-field"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label className="input-label">Email</label>
                <input
                    className="input-field"
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label className="input-label">Password</label>
                <input
                    className="input-field"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <label className="input-label">Phone Number</label>
                <input
                    className="input-field"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <button className="submit-button" type="submit">Sign Up</button>
            </form>

            <p className="or-text">OR</p>

            <div className="social-signup">
                <button className="social-btn facebook">
                    <i className="fab fa-facebook-f"></i> Facebook
                </button>
                <button className="social-btn twitter">
                    <i className="fab fa-twitter"></i> Twitter
                </button>
                <button className="social-btn google">
                    <i className="fab fa-google"></i> Google
                </button>
            </div>

            <p className="terms">
                By logging in, you agree to Ahar's <a href="#">Terms of Service</a>,
                <a href="#"> Privacy Policy</a>, and <a href="#">Content Policies</a>.
            </p>
        </div>
    );
}

export default SignupForm;
