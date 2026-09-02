import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set — copy .env.example to .env and run `docker compose up -d`",
  );
}

const queryClient = postgres(connectionString);

export const db = drizzle(queryClient, { schema });
