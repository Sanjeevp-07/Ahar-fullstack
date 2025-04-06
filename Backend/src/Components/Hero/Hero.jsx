import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Hero.css";

const Hero = () => {
  const [quantity, setQuantity] = useState("");
  const [foodType, setFoodType] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [urgency, setUrgency] = useState("Immediate");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const restaurant_id = localStorage.getItem("restaurant_id"); // Get logged-in restaurant's ID
    console.log("Retrieved restaurant_id:", restaurant_id); // Debugging line

    if (!restaurant_id) {
      alert("Error: Restaurant ID not found. Please log in again.");
      return;
    }
    const formattedExpiryTime = expiryTime.split("T")[1] + ":00";

    const donationData = {
      restaurant_id,
      food_type: foodType,
      quantity,
      expiry_time: formattedExpiryTime ,
      urgency,
      special_instructions: specialInstructions,
    };

    try {
      const response = await axios.post("http://localhost:3001/api/donate", donationData);
      alert("Donation recorded successfully!");
      // Reset form fields after submission
      setQuantity("");
      setFoodType("");
      setExpiryTime("");
      setUrgency("Immediate");
      setSpecialInstructions("");
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Failed to record donation.");
    }
  };

  return (
    <div className="hero">
      {/* Left Section - Donation Form */}
      <div className="Background">
        <div className="donation-form-container">
          <h2 className="form-title">TURN SURPLUS INTO SMILES</h2>
          <p className="form-subtitle">- DONATE FOOD | SHARE SMILES!</p>
          <p className="form-subtitle">- MAKE A DIFFERENCE TODAY!</p>

          <form className="donation-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="number"
                placeholder="Quantity (People Served)"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <select
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                required
              >
                <option value="">Select Food Type</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div className="input-group">
              <input
                type="datetime-local"
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <select value={urgency} onChange={(e) => setUrgency(e.target.value)} required>
                <option value="Immediate">Immediate</option>
                <option value="Within 1 Hour">Within 1 Hour</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <div className="input-group">
              <textarea
                placeholder="Special Instructions (Optional)"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              POST DONATION REQUEST
            </button>
          </form>
        </div>

        <div className="heading">
          <h2 className="mission-title">Join Us in Making a Difference</h2>
          <p className="point_1">
            At Ahar, we believe that small actions can create a big impact. Every day, countless meals go to waste while millions of people struggle with hunger. We exist to bridge this gap—rescuing surplus food and delivering it to those who need it the most.
          </p>
        </div>
      </div>

      {/* Right Section - Mission & Info */}
      <div className="hero-right">
        <div className="mission-container">
          <h3 className="mission-subtitle">Our Mission:</h3>
          <p className="point_1">
            <strong className="Strong">Ending Hunger, One Meal at a Time:</strong> No one should have to sleep on an empty stomach. At Ahar, we are committed to rescuing surplus food from restaurants, events, and businesses and delivering it to those who need it the most.
          </p>
          <p className="point_1">
            <strong className="Strong">Minimizing Food Waste, Maximizing Impact:</strong> Food waste isn't just a lost opportunity—it’s an urgent global issue. Perfectly edible meals often go to waste, filling landfills instead of feeding people. Our mission is to intercept surplus food and redistribute it.
          </p>
          <p className="point_1">
            <strong className="Strong">Strengthening Communities Through Action:</strong> Ahar is about building a network of compassion and support. From restaurants and volunteers to delivery partners and local shelters.
          </p>
        </div>

        <div className="col2">
          <h3 className="mission-subtitle">How You Can Help:</h3>
          <p className="point_1">
            Your support can change lives. Every meal saved, every donation made, and every effort counts in the fight against hunger. Here’s how you can make a difference with Ahar:
          </p>

          <ul className="mission-list">
            <li className="point_1">
              <strong className="Strong">Donate Surplus Food:</strong> If you run a restaurant, café, or catering service, you can donate surplus food instead of letting it go to waste. Every meal saved is a meal served.
            </li>
            <li className="point_1">
              <strong className="Strong">Volunteer for Deliveries:</strong> Help us bridge the gap between donors and recipients by picking up and delivering food to shelters, community centers, and those in need.
            </li>
            <li className="point_1">
              <strong className="Strong">Financial Contributions:</strong> Support our efforts by donating funds to help us expand our operations, improve logistics, and reach more communities in need.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero;
