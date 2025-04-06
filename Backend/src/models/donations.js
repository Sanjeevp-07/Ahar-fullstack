import { pool } from "../config/db.js";  // Correct import for named export
import { getIO } from "../config/socket.js";  // Import WebSocket for real-time updates

const Donation = {
    create: (donationData, callback) => {
        const query = `
            INSERT INTO donations (restaurant_id, food_type, quantity, expiry_time, urgency, special_instructions) 
            VALUES (?, ?, ?, ?, ?, ?)`;

        pool.query(
            query,
            [
                donationData.restaurant_id,
                donationData.food_type,
                donationData.quantity,
                donationData.expiry_time,
                donationData.urgency,
                donationData.special_instructions,
            ],
            (err, result) => {
                if (!err) {
                    //Emit an event when a new donation is created
                    getIO().emit("newDonation", { donationId: result.insertId });
                }
                callback(err, result);
            }
        );
    },

    getByRestaurantId: (restaurant_id, callback) => {
        const query = `SELECT * FROM donations WHERE restaurant_id = ? ORDER BY created_at DESC`;
        pool.query(query, [restaurant_id], callback);
    }
};

export default Donation;
