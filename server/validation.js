/**
 * Shared validation for API params (security: reject malformed ids).
 */

const SAFE_ID_PATTERN = /^[a-zA-Z0-9_-]{1,128}$/;

/**
 * Validate agent or block id (alphanumeric, hyphen, underscore, 1–128 chars).
 * @param {unknown} id
 * @returns {boolean}
 */
export function isValidId(id) {
  return typeof id === 'string' && SAFE_ID_PATTERN.test(id);
}
