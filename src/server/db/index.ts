// // import { drizzle } from "drizzle-orm/postgres-js";

// import postgres from "postgres";

// import { env } from "~/env";
// import * as schema from "./schema";

// /**
//  * Cache the database connection in development. This avoids creating a new connection on every HMR
//  * update.
//  */
// const globalForDb = globalThis as unknown as {
//   conn: postgres.Sql | undefined;
// };

// const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
// if (env.NODE_ENV !== "production") globalForDb.conn = conn;

// export const db = drizzle(conn, { schema });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// neonConfig.fetchConnectionCache = true;
// console.log(process.env.DATABASE_URL);
// if (!process.env.DATABASE_URL) {
//   throw new Error("database url not found");
// }

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql);