import React, { useState } from "react";
import "./CSS/orderpage.css"; // Ensure your CSS file is correctly located

// Order data (Temporary for testing, replace with API data later)
const orders = [
  {
    restaurantName: "Restaurant 1",
    address: "123 Main Street, City",
    timing: "10:00 AM - 10:00 PM",
    quantity: 2,
    foodType: "Vegetarian",
    phone: "9876543210",
    status: "Pending",
  },
  {
    restaurantName: "Restaurant 2",
    address: "456 Elm Street, City",
    timing: "11:00 AM - 11:00 PM",
    quantity: 3,
    foodType: "Non-Vegetarian",
    phone: "8765432109",
    status: "Picked Up",
  },
  {
    restaurantName: "Restaurant 3",
    address: "789 Pine Street, City",
    timing: "9:00 AM - 9:00 PM",
    quantity: 1,
    foodType: "Vegan",
    phone: "7654321098",
    status: "Delivered",
  },
  {
    restaurantName: "Restaurant 4",
    address: "321 Oak Street, City",
    timing: "12:00 PM - 12:00 AM",
    quantity: 4,
    foodType: "Mixed",
    phone: "6543210987",
    status: "Pending",
  },
  {
    restaurantName: "Restaurant 5",
    address: "159 Maple Street, City",
    timing: "1:00 PM - 1:00 AM",
    quantity: 5,
    foodType: "Vegetarian",
    phone: "5432109876",
    status: "Picked Up",
  },
];

const DeliveryOrders = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div onClick={closeMenu}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          {/* Hamburger Button */}
          <div className="hamburger" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="logo">Delivery Orders</div>
        </div>

        {/* Right side (Profile) */}
        <div className="nav-right">
          <div className="menu-container">
            <img
              src="https://www.pngmart.com/files/23/Profile-PNG-Photo.png"
              alt="Profile"
              className="profile-pic"
            />
          </div>
        </div>
      </nav>

      {/* Dropdown Menu for Hamburger */}
      <div className={`hamburger-menu ${menuOpen ? "show" : ""}`}>
        <button className="menu-btn">Help</button>
        <button className="menu-btn">History</button>
        <button className="menu-btn">Logout</button>
      </div>

      {/* Orders Section */}
      <div className="orders-container">
        {orders.map((order, index) => (
          <div className="order-card" key={index}>
            <h3 className="restaurant-name">{order.restaurantName}</h3>
            <p className="order-details"><strong>Address:</strong> {order.address}</p>
            <p className="order-details"><strong>Timing:</strong> {order.timing}</p>
            <p className="order-details"><strong>Quantity:</strong> {order.quantity}</p>
            <p className="order-details"><strong>Food Type:</strong> {order.foodType}</p>
            <p className="order-details"><strong>Phone:</strong> {order.phone}</p>
            <p className="order-details">
              <strong>Status:</strong> 
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </p>
            <button className="pending-btn">Pending</button>
            <button className="picked-btn">Picked Up</button>
            <button className="delivered-btn">Delivered</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOrders;
