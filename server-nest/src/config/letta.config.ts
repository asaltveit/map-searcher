/**
 * Letta AI Agent Configuration
 *
 * Centralized configuration for default agent settings.
 * Modify these values to change default behavior for new agents.
 */

/** Default tools attached to new agents */
export const DEFAULT_AGENT_TOOLS = ["web_search", "run_code"];

/** Default LLM model for agents */
export const DEFAULT_AGENT_MODEL = "openai/gpt-4o-mini";

/** Default embedding model for agent memory */
export const DEFAULT_EMBEDDING_MODEL = "openai/text-embedding-3-small";

/** Default persona for new agents */
export const DEFAULT_PERSONA =
  "I am a helpful AI assistant. I provide clear, accurate, and helpful responses.";

/** Default human memory block template */
export const DEFAULT_HUMAN_TEMPLATE = (name: string) =>
  `Name: ${name}\nPreferences: Not yet specified.`;

/** Maximum message content length */
export const MAX_MESSAGE_LENGTH = 10000;

/** Maximum system prompt length */
export const MAX_SYSTEM_PROMPT_LENGTH = 50000;

/** Maximum agent name length */
export const MAX_AGENT_NAME_LENGTH = 100;

/** Maximum agent description length */
export const MAX_AGENT_DESCRIPTION_LENGTH = 500;
