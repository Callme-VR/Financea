// Load .env into process.env in a way that works during Prisma's TS/JS config loading.
// Use require() so it works whether the runtime treats this file as CJS or ESM.
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const dotenv = require("dotenv");
  dotenv.config();
} catch (e) {
  // If dotenv isn't available or fails, continue — Prisma will report missing vars later.
}
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
