import { creatTable } from "./src/utils/dbUtils.js";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from 'dotenv';
import http from "http";
import cors from "cors";

import { Server } from "socket.io";
import userRoutes from "./src/routes/userRoutes.js";
import donationRoutes from "./src/routes/donationRoutes.js";
import deliveryRoutes from "./src/routes/deliveryRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import { checkConnection } from "./src/config/db.js";
import { initializeSocket } from "./src/config/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // WebSocket server

// For __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files only if needed
app.use(express.static(join(__dirname, "public"))); 

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log("Incoming Request:", req.method, req.url);
    console.log("Body Data:", req.body);
    next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", donationRoutes);
app.use("/api/delivery-auth", deliveryRoutes);

// WebSocket Initialization
initializeSocket(server);

const port = 3001;

server.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
    try {
        await checkConnection();
        await creatTable();
    } catch (error) {
        console.error("Failed to initialize the database:", error);
    }
});
