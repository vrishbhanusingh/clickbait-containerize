// import { type Config } from "drizzle-kit";

// import { env } from "~/env";

// export default {
//   schema: "./src/server/db/schema.ts",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: env.DATABASE_URL,
//   },
//   tablesFilter: ["clickbait-containerize_*"],
// } satisfies Config;

import type { Config } from "drizzle-kit";
import { env } from "~/env";


export default {
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["clickbait-containerize_*"],
} satisfies Config;