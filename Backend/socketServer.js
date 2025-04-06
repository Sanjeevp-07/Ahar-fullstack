/* import { Server } from "socket.io";
import { pool } from "./utils/dbUtils.js";

const io = new Server(process.env.SOCKET_PORT || 5000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Simulating live location updates (Replace with real GPS data)
  setInterval(() => {
    const randomLat = 28.6 + Math.random() * 0.02;
    const randomLng = 77.2 + Math.random() * 0.02;
    socket.emit("locationUpdate", { lat: randomLat, lng: randomLng });
  }, 3000);

  // Listen for new donations (after inserting into DB)
  socket.on("newDonation", async (restaurantId) => {
    try {
      const [donations] = await pool.query(
        "SELECT * FROM donations WHERE restaurant_id = ? ORDER BY created_at DESC LIMIT 5",
        [restaurantId]
      );
      io.emit("updateDonations", donations); // Send updates to all clients
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

export default io;
 */


import http from 'http';
import app from './src/app.js';
import { initSocket } from './src/config/socket.js';

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

