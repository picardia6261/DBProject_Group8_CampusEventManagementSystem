import mysql, { Pool } from "mysql2/promise";

// Cache the pool across hot reloads in dev to prevent creating many pools.
let cachedPool: Pool | null =
  (globalThis as any)._campusEventPool ?? null;

if (!cachedPool) {
  cachedPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "campus_event_management_system", // YOUR DB NAME
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  (globalThis as any)._campusEventPool = cachedPool;
}

export default async function db() {
  return cachedPool as Pool;
}
