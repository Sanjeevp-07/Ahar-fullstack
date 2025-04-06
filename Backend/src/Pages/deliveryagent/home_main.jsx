import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home_main.css";

const DeliveryHome = () => {
  const [donations, setDonations] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // For loading button state

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/donations");
      setDonations(res.data.data);
    } catch (error) {
      console.error("Failed to fetch donations:", error);
    }
  };

  const handleAcceptPickup = async (donationId) => {
    try {
      setLoadingId(donationId); // Show loading for this card
      await axios.put(`http://localhost:3001/api/donations/${donationId}/accept`);
      // Refresh donations after update
      fetchDonations();
    } catch (error) {
      console.error("Failed to accept pickup:", error);
      alert("Error accepting the donation pickup.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="delivery-container">
      <header className="delivery-header">
        <h1>🚚 AHAR Delivery Dashboard</h1>
        <p>Your mission: Make sure no one sleeps hungry 🙌</p>
      </header>

      <section className="donation-section">
        <h2>Available Donation Requests</h2>
        {donations.length === 0 ? (
          <p className="no-data">No donation requests available yet.</p>
        ) : (
          <div className="donation-grid">
            {donations.map((donation) => (
              <div key={donation.id} className="donation-card">
                <h3>{donation.restaurant_name}</h3>
                <p><strong>Food:</strong> {donation.food_details}</p>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
                <p><strong>Pickup Location:</strong> {donation.pickup_location}</p>
                <p><strong>Posted:</strong> {new Date(donation.created_at).toLocaleString()}</p>
                <p><strong>Status:</strong> {donation.status}</p>
                <button
                  className="pickup-btn"
                  onClick={() => handleAcceptPickup(donation.id)}
                  disabled={loadingId === donation.id || donation.status !== "pending"}
                >
                  {loadingId === donation.id ? "Accepting..." : "Accept Pickup"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DeliveryHome;
