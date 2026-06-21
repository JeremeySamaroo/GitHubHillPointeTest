import dotenv from "dotenv";
import { Pool } from "pg";
import app from "./app";

dotenv.config();

// console.log("Port:", process.env.PORT);
// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_PORT:", process.env.DB_PORT);
// console.log("DB_NAME:", process.env.DB_NAME);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const PORT = Number(process.env.PORT) || 3000;

const pool = new Pool({
    host: process.env.DB_HOST || "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || "app_db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
});

async function startServer() {
    try {
        const client = await pool.connect();

        console.log("Connected to PostgreSQL");

        const result = await client.query("SELECT NOW()");

        console.log("Database time:", result.rows[0].now);

        client.release();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to PostgreSQL");
        console.error(error);

        process.exit(1);
    }
}

startServer();