import { drizzle } from "drizzle-orm/libsql";

const db = await drizzle(process.env.DB_FILE_NAME!)

export default db