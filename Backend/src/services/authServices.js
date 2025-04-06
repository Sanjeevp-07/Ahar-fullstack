import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "abcabcabcacbsdfasdfasdfasdfasdf";

export const registerUser = async (user) => {
    console.log(user);

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const query = `INSERT INTO restaurants(name, email, phone_number, password, organization_name, street_address, postal_zip, city, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            user.name,
            user.email,
            user.phone_number,
            hashedPassword,
            user.organization_name,
            user.street_address,
            user.postal_zip,
            user.city,
            user.country
        ];

        await pool.query(query, values);
        console.log("User Registered Successfully in DB");
        return { success: true, message: "User Registered Successfully" };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, message: "Registration Failed. Please try again later." };
    }
};

export const loginUser = async (email, password) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM restaurants WHERE email = ?`, [email]);
        if (rows.length === 0) {
            return { success: false, message: "User Not Found" };
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { success: false, message: "Invalid Password" };
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return {
            success: true,
            message: 'Login Successful',
            token: token,
            restaurant_id: user.id
        };
    } catch (error) {
        console.error("Login Error:", error);
        return { success: false, message: "Login failed. Please try again later." };
    }
};

export const getUserFromTokenService = async (token) => {
    try {
        const trimmedToken = token.trim();
        const decodedToken = jwt.verify(trimmedToken, JWT_SECRET);

        const [rows] = await pool.query(`SELECT id, name, phone_number, email FROM restaurants WHERE email = ?`, [decodedToken.email]);
        if (rows.length === 0) {
            return { success: false, message: "User Not Found" };
        }
        return { success: true, data: rows[0] };
    } catch (error) {
        console.error("Token Verification Error:", error);
        return { success: false, message: "Invalid Token" };
    }
};
