/**
 * Sync local environment files to Postman workspace
 */
import "dotenv/config";
import { readFileSync, readdirSync } from "fs";
import { resolve, basename } from "path";
import {
  getPostmanApiKey,
  getWorkspaceId,
  syncEnvironment,
} from "./lib/postman-env-sync";

interface EnvFile {
  name: string;
  values: Array<{
    key: string;
    value: string;
    type?: "default" | "secret";
    enabled?: boolean;
  }>;
}

async function syncEnvironments() {
  const apiKey = await getPostmanApiKey();
  const workspaceId = await getWorkspaceId();

  // Find all env.*.json files in postman directory
  const postmanDir = resolve(__dirname, "../postman");
  const envFiles = readdirSync(postmanDir).filter(
    (file) => file.startsWith("env.") && file.endsWith(".json"),
  );

  if (envFiles.length === 0) {
    console.log("No environment files found in postman/ directory");
    return;
  }

  console.log(`Found ${envFiles.length} environment file(s) to sync`);

  for (const envFile of envFiles) {
    const filePath = resolve(postmanDir, envFile);
    const envName = basename(envFile, ".json").replace("env.", "");

    console.log(`\nSyncing: ${envFile}`);

    try {
      const content = readFileSync(filePath, "utf-8");
      const envData = JSON.parse(content) as EnvFile;

      const result = await syncEnvironment(apiKey, workspaceId, envData);
      console.log(`  ${result.action === "created" ? "Created" : "Updated"} environment: ${envData.name}`);
      console.log(`  ID: ${result.id}`);
    } catch (err) {
      console.error(`  Error syncing ${envFile}:`, err);
    }
  }

  console.log("\nEnvironment sync complete!");
}

syncEnvironments().catch((err) => {
  console.error("Failed to sync environments:", err);
  process.exit(1);
});
