import { registerUser, loginUser, getUserFromTokenService } from "../services/authServices.js";

export const register = async (req, res) => {
    console.log("Received Data:", req.body);

    const { name, phone_number, email, password, organization_name, street_address, postal_zip, city, country } = req.body;

    if (!name || !phone_number || !email || !password || !organization_name || !street_address || !postal_zip || !city || !country) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = { name, phone_number, email, password, organization_name, street_address, postal_zip, city, country };

    try {
        const response = await registerUser(user);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error("Error Registering User:", error);
        return res.status(500).json({ success: false, message: "Registration Failed. Please try again later." });
    }
};

export const login = async (req, res) => {
    console.log("Login API hit!");

    const { email, password } = req.body;
    console.log("Received Email:", email, "Received Password:", password);

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const response = await loginUser(email, password);
        console.log("Login Response from Service:", response);

        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error("Error Logging In User:", error);
        return res.status(500).json({ success: false, message: "Login Failed." });
    }
};

export const getUserFromToken = async (req, res) => {
    if (!req.headers || !req.headers.authorization) {
        return res.status(400).json({ success: false, message: "Authorization header is missing" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(400).json({ success: false, message: "Token Not Provided" });
    }

    console.log("Received Token:", token);

    try {
        const response = await getUserFromTokenService(token);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error("Error Retrieving User:", error);
        return res.status(500).json({ success: false, message: "Failed to retrieve data." });
    }
};
