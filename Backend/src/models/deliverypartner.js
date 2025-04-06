import {pool} from "../config/db.js";

export const createDeliveryPartner = async (name, email, password, phone) => {
    const [result] = await pool.execute(
        "INSERT INTO delivery_partners (name, email, password, phone) VALUES (?, ?, ?, ?)",
        [name, email, password, phone]
    );
    return result;
};

export const getDeliveryPartnerByEmail = async (email) => {
    const [rows] = await pool.execute(
        "SELECT * FROM delivery_partners WHERE email = ?",
        [email]
    );
    return rows[0];
};
