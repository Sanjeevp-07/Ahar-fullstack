import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createDeliveryPartner, getDeliveryPartnerByEmail } from "../models/deliverypartner.js";

const JWT_SECRET = "your_jwt_secret"; // Change to env variable

export const registerDeliveryPartner = async (req, res) => {
    const { name, email, password, phone } = req.body;
    
    try {
        const existingUser = await getDeliveryPartnerByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createDeliveryPartner(name, email, hashedPassword, phone);

        res.status(201).json({ message: "Delivery partner registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering delivery partner", error });
    }
};

export const loginDeliveryPartner = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getDeliveryPartnerByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};
