import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use direct connection for CLI operations (migrations bypass PgBouncer)
    // Falls back to placeholder for build-time operations (prisma generate)
    // where no actual database connection is needed
    url:
      process.env.DIRECT_DATABASE_URL ??
      process.env.DATABASE_URL ??
      "postgresql://placeholder:placeholder@localhost:5432/placeholder",
  },
});
