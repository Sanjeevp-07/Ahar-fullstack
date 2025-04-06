import { pool } from "../config/db.js"

const creatTable = async () => {
    try {

        await pool.query(
            ` CREATE TABLE IF NOT EXISTS restaurants(
            id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    postal_zip VARCHAR(20),
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL
);`
        )
        console.log("Table restaurants is created ");
    } catch (error) {
        console.log("Error found idk why  ");
    }
}

export {creatTable};