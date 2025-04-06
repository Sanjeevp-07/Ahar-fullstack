import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./CSS/aharDonationHistory.css";

const socket = io("http://localhost:3001"); // Adjust backend URL if needed

const DonationHistory = ({ restaurantId }) => {
  const [donationHistory, setDonationHistory] = useState([]);
  const [restaurantName, setRestaurantName] = useState("Restaurant");

  useEffect(() => {
    const fetchDonationHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/donations/restaurant/${restaurantId}`);
        setDonationHistory(response.data);
      } catch (error) {
        console.error("Error fetching donation history:", error);
      }
    };

    // Fetch restaurant name (Optional, if available in backend)
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/restaurants/${restaurantId}`);
        setRestaurantName(response.data.name);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    fetchDonationHistory();
    fetchRestaurantDetails();

    // Listen for real-time updates
    socket.emit("newDonation", restaurantId);
    socket.on("updateDonations", (newDonations) => {
      setDonationHistory(newDonations);
    });

    return () => {
      socket.off("updateDonations");
    };
  }, [restaurantId]);

  return (
    <div>
      {/* Top Container */}
      <div className="top-container">
        <span className="website-name">Ahar</span>
        <h1 className="history-title">{restaurantName} - Donation History</h1>
        <div className="profile-pic">👤</div>
      </div>

      {/* Donation History List */}
      <div className="container5">
        {donationHistory.length === 0 ? (
          <p>No donation history available for this restaurant.</p>
        ) : (
          donationHistory.map((donation, index) => (
            <div key={index} className="donation-card">
              <p><strong>Date:</strong> {new Date(donation.created_at).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(donation.created_at).toLocaleTimeString()}</p>
              <p><strong>Food Type:</strong> {donation.food_type} - {donation.quantity} items</p>
              <p><strong>Urgency:</strong> {donation.urgency}</p>
              {donation.special_instructions && <p><strong>Instructions:</strong> {donation.special_instructions}</p>}
              <p>
                <strong>Status:</strong>{" "}
                <span className={donation.status === "Delivered" ? "delivered" : "pending"}>
                  {donation.status}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DonationHistory;
