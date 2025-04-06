import React, { useState } from "react";
import "./CSS/RestaurantDetail.css"; // Import styles

const RestaurantDetail = () => {
  const [details, setDetails] = useState({
    organization: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Restaurant Registered:", details);
    alert("Restaurant details submitted successfully!");
  };

  return (
    <div className="restaurant-container">
      <div className="restaurant-box">
        <h2 className="restaurant-title">Restaurant Detail</h2>
        <form className="restaurant-form" onSubmit={handleSubmit}>
          <label>Organization Name*</label>
          <input type="text" name="organization" placeholder="Organization Name" onChange={handleChange} required />

          <label>Street Address*</label>
          <input type="text" name="address" placeholder="Street Address" onChange={handleChange} required />

          <label>Postal / ZIP</label>
          <input type="text" name="zip" placeholder="ZIP Code" onChange={handleChange} />

          <label>City</label>
          <input type="text" name="city" placeholder="City" onChange={handleChange} />

          <label>Country</label>
          <input type="text" name="country" placeholder="Country" onChange={handleChange} />

          <label>Phone Number</label>
          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />

          <button type="submit" className="restaurant-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default RestaurantDetail;
