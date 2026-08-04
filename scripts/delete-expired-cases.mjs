import { execFileSync } from "node:child_process";

const databaseName = process.env.ANALYTICS_DATABASE_NAME;
if (!databaseName) {
  throw new Error("Set ANALYTICS_DATABASE_NAME to your own Cloudflare D1 database name.");
}

execFileSync(
  "npx",
  [
    "wrangler",
    "d1",
    "execute",
    databaseName,
    "--remote",
    "--file",
    "analytics/queries/delete-expired-cases.sql",
  ],
  { stdio: "inherit" },
);
