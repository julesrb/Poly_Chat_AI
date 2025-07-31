import fs from "fs";
import path from "path";
import pool from "../src/lib/db.ts";
import { fileURLToPath } from "url";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

/**
 * Initializes the PostgreSQL database schema by executing the SQL file.
 *
 * Reads `schema.sql` from the lib directory and applies it to the DB.
 */
async function initDb() : Promise<void> {
	console.log(process.env.DATABASE_URL);
	try {
		const schemaPath: string = path.join(__dirname, "schema.sql");
		console.log(schemaPath);
		const schema: string = fs.readFileSync(schemaPath, "utf8");
		await pool.query(schema);
		console.log("✅ Database initialized successfully!");
	} catch (err: unknown) {
		console.error("❌ Error initializing database:", err);
	} finally {
		await pool.end();
	}
}

initDb();