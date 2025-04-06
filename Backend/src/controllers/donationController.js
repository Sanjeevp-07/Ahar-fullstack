import Donation from "../models/donations.js";  // Adjust the path and file extension if necessary
import  {getIO}  from "../config/socket.js"; // Import WebSocket for real-time updates
import  {pool}  from "../config/db.js"; // Import database connection

export const createDonation = async (req, res) => {
    const { restaurant_id, food_type, quantity, expiry_time, urgency, special_instructions } = req.body;

    console.log("Received restaurant_id:", restaurant_id);  // Debugging line
    
    if (!restaurant_id || !food_type || !quantity || !expiry_time || !urgency) {
        return res.status(400).json({ error: "All fields except special instructions are required." });
    }

    Donation.create(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }
        res.status(201).json({ message: "Donation recorded successfully", donation_id: result.insertId });
    });
};

export const getActiveDonations = async (req, res) => {
    try {
        const donations = await getPendingDonations();
        res.status(200).json(donations);
    } catch (error) {
        console.error("Error fetching active donations:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateDonationStatusController = async (req, res) => {
    const { donationId, status } = req.body;

    if (!donationId || !status) {
        return res.status(400).json({ error: "Invalid request. Donation ID and status are required." });
    }

    try {
        await updateDonationStatus(donationId, status);
        
        // Notify all connected clients about the update
        getIO().emit("updateList", { donationId, status });

        res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
        console.error("Error updating donation status:", error.message);
        res.status(500).json({ error: "Failed to update status" });
    }
};

export const getDonationsByRestaurant = async (req, res) => {
    const restaurant_id = req.params.id;

    Donation.getByRestaurantId(restaurant_id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err });
        }
        res.status(200).json(results);
    });
};

export const changeDonationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { donationId } = req.params;

        // Validate input status
        if (!status || !['Pending', 'Delivered', 'Failed'].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        // Update donation status in MySQL using async/await
        const [result] = await pool.query(
            "UPDATE donations SET status = ? WHERE id = ?",
            [status, donationId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Donation not found" });
        }

        // Send real-time update via WebSocket
        getIO().emit("updateList", { donationId, status });

        res.json({ message: "Donation status updated successfully" });
    } catch (error) {
        console.error("Error updating donation status:", error);
        res.status(500).json({ error: "Failed to update donation status" });
    }
};

// GET All Donations
export const getAllDonations = async (req, res) => {
    try {
      const [rows] = await db.execute(`SELECT * FROM donations ORDER BY created_at DESC`);
      res.status(200).json({ success: true, data: rows });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  export const acceptDonation = async (req, res) => {
    const donationId = req.params.id;
    try {
      const [result] = await db.execute(
        "UPDATE donations SET status = ? WHERE id = ?",
        ["accepted", donationId]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Donation not found." });
      }
  
      res.status(200).json({ message: "Donation accepted successfully." });
    } catch (error) {
      console.error("Error accepting donation:", error);
      res.status(500).json({ message: "Server error." });
    }
  };
