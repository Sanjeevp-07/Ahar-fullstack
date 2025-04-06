import * as donationModel from "../models/donationModel.js";
import { getIO } from "../config/socket.js";

export const getActiveDonations = async (req, res) => {
    try {
        const donations = await donationModel.getPendingDonations();
        res.json(donations);
    } catch (error) {
        console.error("Error fetching active donations:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export const updateDonationStatus = async (req, res) => {
    const { donationId, status } = req.body;
    try {
        await donationModel.updateDonationStatus(donationId, status);
        getIO().emit("updateList", { donationId, status });
        res.json({ message: "Status updated successfully" });
    } catch (error) {
        console.error("Error updating donation status:", error);
        res.status(500).json({ error: "Failed to update status" });
    }
};