import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Allow all for testing; tighten in production
      methods: ["GET", "POST"],
    },
  });

  const deliveryAgents = {}; // Store agent locations if needed

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // 🔴 Listen for delivery agent location
    socket.on("send-location", ({ id, latitude, longitude }) => {
      console.log(`Received location from ${id}: ${latitude}, ${longitude}`);
      deliveryAgents[id] = { latitude, longitude };

      // 🔵 Broadcast to all clients (e.g., restaurant map)
      io.emit("receive-location", { id, latitude, longitude });
    });

    // 🔴 Listen for agent disconnect
    socket.on("agent-disconnected", ({ id }) => {
      console.log(`Delivery agent disconnected: ${id}`);
      delete deliveryAgents[id];
    });

    // 🔴 Socket disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

export const getIO = () => io;
