import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import io from "socket.io-client";

// Connect to backend server
const socket = io("http://localhost:3001"); // Update to your backend URL if deployed

const GpsTracking = () => {
  const [markers, setMarkers] = useState({});  // Stores all active delivery agents
  const [restaurantLocation, setRestaurantLocation] = useState(null);  // Restaurant owner location
  const mapRef = useRef();  // For future map interactions

  // Icon for Delivery Agent
  const agentIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 45],
    iconAnchor: [15, 45],
  });

  // Icon for Restaurant Owner
  const restaurantIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",  // Replace with any custom icon if needed
    iconSize: [35, 45],
    iconAnchor: [17, 45],
  });

  // Track Restaurant Owner’s Location
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setRestaurantLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting restaurant location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      // Cleanup watcher on unmount
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Listen for delivery agents' location updates
  useEffect(() => {
    socket.on("receive-location", ({ id, latitude, longitude }) => {
      setMarkers((prevMarkers) => ({
        ...prevMarkers,
        [id]: { latitude, longitude },
      }));
    });

    socket.on("agent-disconnected", ({ id }) => {
      setMarkers((prevMarkers) => {
        const updated = { ...prevMarkers };
        delete updated[id];
        return updated;
      });
    });

    return () => {
      socket.off("receive-location");
      socket.off("agent-disconnected");
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[20.5937, 78.9629]} // Default center
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {/* Delivery Agents Markers */}
        {Object.entries(markers).map(([id, { latitude, longitude }]) => (
          <Marker key={id} position={[latitude, longitude]} icon={agentIcon}>
            <Popup>🚚 Delivery Agent ID: {id}</Popup>
          </Marker>
        ))}

        {/* Restaurant Owner Marker */}
        {restaurantLocation && (
          <Marker
            position={[restaurantLocation.latitude, restaurantLocation.longitude]}
            icon={restaurantIcon}
          >
            <Popup>🏠 Restaurant Location (You)</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default GpsTracking;
