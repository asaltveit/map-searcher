/**
 * Strip JSON Comments - Collection Pre-Request Script
 *
 * This script strips JS-style comments from JSON request bodies before sending.
 * Supports both line comments (//) and block comments.
 * This allows optional fields to be commented out in the Postman collection
 * while still being valid when uncommented.
 *
 * Usage: Optional fields are shown commented out like:
 *   {
 *     "name": "Test Agent {{$timestamp}}",
 *     "model": "openai/gpt-4o-mini"
 *     // "description": "<string>",
 *     // "temperature": 0.7,
 *   }
 *
 * When you uncomment a field, it will be included in the request.
 */

// Regex to strip JS comments while preserving strings
// Matches: quoted strings (to skip) OR // line comments OR /* block comments */
const stripComments = (jsonBody) =>
  jsonBody.replace(
    /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g,
    (match, group) => (group ? '' : match),
  );

// Only process if there's a raw body
if (pm.request.body && pm.request.body.raw) {
  const original = pm.request.body.raw;
  const cleaned = stripComments(original);

  // Only modify if comments were found
  if (cleaned !== original) {
    // Also clean up any trailing commas before closing braces
    // (in case the last required field had a comma for the commented fields)
    const finalCleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');

    pm.request.body.raw = finalCleaned;
    console.log('Stripped comments from request body');
  }
}
