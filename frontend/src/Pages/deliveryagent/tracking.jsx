import React, { useEffect } from "react";
import io from "socket.io-client";

// Connect to backend WebSocket
const socket = io("http://localhost:3001"); // Change if hosted elsewhere

const Tracking = () => {
  const deliveryAgentId = "agent123"; // 🔴 Change dynamically per agent if needed

  useEffect(() => {
    // Check if Geolocation is supported
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    // Watch position continuously
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`📍 Sending location: ${latitude}, ${longitude}`);

        // Emit location to backend
        socket.emit("send-location", {
          id: deliveryAgentId,
          latitude,
          longitude,
        });
      },
      (error) => {
        console.error("❌ Geolocation Error:", error);
        alert("Error accessing location. Please allow GPS permissions.");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 10000,
      }
    );

    // Cleanup: stop watching location + notify backend
    return () => {
      navigator.geolocation.clearWatch(watchId);
      console.log("🛑 Stopped tracking. Disconnecting...");
      socket.emit("agent-disconnected", { id: deliveryAgentId });
    };
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🛰️ Location Tracking Active</h2>
      <p>Delivery Agent ID: <strong>{deliveryAgentId}</strong></p>
    </div>
  );
};

export default Tracking;
