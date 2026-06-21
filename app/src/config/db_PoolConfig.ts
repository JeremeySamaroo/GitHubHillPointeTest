import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    host: process.env.DB_HOST || "postgres",
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || "app_db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
});