/**
 * Push generated Postman collection to Postman workspace
 */
import "dotenv/config";
import { readFileSync } from "fs";
import { resolve } from "path";

const POSTMAN_API_BASE = "https://api.getpostman.com";

interface PostmanCollection {
  info: {
    name: string;
    schema: string;
    [key: string]: unknown;
  };
  item: unknown[];
  [key: string]: unknown;
}

async function pushCollection() {
  const apiKey = process.env.POSTMAN_API_KEY;
  const workspaceId = process.env.POSTMAN_WORKSPACE_ID;
  const collectionId = process.env.POSTMAN_COLLECTION_ID;

  if (!apiKey) {
    console.error("Error: POSTMAN_API_KEY environment variable is not set");
    process.exit(1);
  }

  if (!workspaceId) {
    console.error("Error: POSTMAN_WORKSPACE_ID environment variable is not set");
    process.exit(1);
  }

  // Read the generated collection
  const collectionPath = resolve(__dirname, "../postman/collection.json");
  let collection: PostmanCollection;

  try {
    const content = readFileSync(collectionPath, "utf-8");
    collection = JSON.parse(content) as PostmanCollection;
  } catch (err) {
    console.error(`Error reading collection file: ${collectionPath}`);
    console.error(err);
    process.exit(1);
  }

  console.log(`Pushing collection: ${collection.info.name}`);

  if (collectionId) {
    // Update existing collection
    console.log(`Updating existing collection: ${collectionId}`);

    const response = await fetch(
      `${POSTMAN_API_BASE}/collections/${collectionId}`,
      {
        method: "PUT",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collection }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to update collection: ${response.status}`);
      console.error(errorText);
      process.exit(1);
    }

    const result = await response.json();
    console.log("Collection updated successfully!");
    console.log(`Collection ID: ${collectionId}`);
    console.log(result);
  } else {
    // Create new collection
    console.log("Creating new collection in workspace...");

    const response = await fetch(
      `${POSTMAN_API_BASE}/collections?workspace=${workspaceId}`,
      {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collection }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to create collection: ${response.status}`);
      console.error(errorText);
      process.exit(1);
    }

    const result = (await response.json()) as { collection: { id: string; uid: string } };
    console.log("Collection created successfully!");
    console.log(`New Collection ID: ${result.collection.id}`);
    console.log(`Add this to your .env: POSTMAN_COLLECTION_ID=${result.collection.id}`);
  }
}

pushCollection().catch((err) => {
  console.error("Failed to push collection:", err);
  process.exit(1);
});
