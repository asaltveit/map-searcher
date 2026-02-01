/**
 * Sync local environment files to Postman workspace
 */
import 'dotenv/config';
import { readFileSync, readdirSync } from 'fs';
import { resolve, basename } from 'path';
import {
  PostmanEnvironment,
  syncEnvironment,
  EnvSyncError,
} from './lib/postman-env-sync';

async function syncEnvironments() {
  const apiKey = process.env.POSTMAN_API_KEY;
  const workspaceId = process.env.POSTMAN_WORKSPACE_ID;

  if (!apiKey) {
    throw new EnvSyncError(
      'POSTMAN_API_KEY not found in environment variables.\n' +
        'Get your API key from: https://web.postman.co/settings/me/api-keys\n' +
        'Add it to your .env file: POSTMAN_API_KEY=your_key_here',
      'MISSING_CONFIG',
    );
  }

  if (!workspaceId) {
    console.log('⚠️  Warning: POSTMAN_WORKSPACE_ID not configured');
    console.log(
      '   Environments will be created globally (may not appear in workspace)',
    );
    console.log('');
  }

  // Find all env.*.json files in postman directory
  const postmanDir = resolve(__dirname, '../postman');
  const envFiles = readdirSync(postmanDir).filter(
    (file) => file.startsWith('env.') && file.endsWith('.json'),
  );

  if (envFiles.length === 0) {
    console.log('No environment files found in postman/ directory');
    return;
  }

  console.log(`Found ${envFiles.length} environment file(s) to sync`);

  // Map of environment names to their ID env var keys
  const envIdKeys: Record<string, string> = {
    local: 'POSTMAN_ENV_LOCAL_ID',
    staging: 'POSTMAN_ENV_STAGING_ID',
    prod: 'POSTMAN_ENV_PROD_ID',
  };

  for (const envFile of envFiles) {
    const filePath = resolve(postmanDir, envFile);
    const envName = basename(envFile, '.json').replace('env.', '');

    console.log(`\nSyncing: ${envFile}`);

    try {
      const content = readFileSync(filePath, 'utf-8');
      const envData = JSON.parse(content) as PostmanEnvironment;

      // Check for existing environment ID in env vars
      const envIdKey = envIdKeys[envName];
      const existingEnvId = envIdKey ? process.env[envIdKey] : undefined;

      if (existingEnvId) {
        console.log(`  Using existing ID from ${envIdKey}`);
      }

      const result = await syncEnvironment(
        apiKey,
        envData,
        existingEnvId,
        workspaceId,
      );

      console.log(
        `  ${result.action === 'created' ? 'Created' : 'Updated'} environment: ${envData.name}`,
      );
      console.log(`  ID: ${result.id}`);

      // Suggest adding ID to env if newly created
      if (result.action === 'created' && envIdKey) {
        console.log(`  💡 Add to .env: ${envIdKey}="${result.id}"`);
      }
    } catch (err) {
      console.error(`  Error syncing ${envFile}:`, err);
    }
  }

  console.log('\nEnvironment sync complete!');
}

syncEnvironments().catch((err) => {
  console.error('Failed to sync environments:', err);
  process.exit(1);
});
