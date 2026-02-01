/**
 * Tests for server/validation.js (security: id validation).
 */
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { isValidId } from '../validation.js';

describe('isValidId', () => {
  it('accepts alphanumeric ids', () => {
    assert.strictEqual(isValidId('abc123'), true);
    assert.strictEqual(isValidId('agent-xyz'), true);
    assert.strictEqual(isValidId('block_123'), true);
    assert.strictEqual(isValidId('a'), true);
  });

  it('accepts UUID-like ids', () => {
    assert.strictEqual(isValidId('550e8400-e29b-41d4-a716-446655440000'), true);
  });

  it('rejects empty string', () => {
    assert.strictEqual(isValidId(''), false);
  });

  it('rejects ids longer than 128 chars', () => {
    assert.strictEqual(isValidId('a'.repeat(129)), false);
    assert.strictEqual(isValidId('a'.repeat(128)), true);
  });

  it('rejects ids with unsafe characters', () => {
    assert.strictEqual(isValidId('id with spaces'), false);
    assert.strictEqual(isValidId('id/slash'), false);
    assert.strictEqual(isValidId('id.dot'), false);
    assert.strictEqual(isValidId('id<script>'), false);
    assert.strictEqual(isValidId('../etc/passwd'), false);
    assert.strictEqual(isValidId('id\x00null'), false);
  });

  it('rejects non-strings', () => {
    assert.strictEqual(isValidId(null), false);
    assert.strictEqual(isValidId(undefined), false);
    assert.strictEqual(isValidId(123), false);
    assert.strictEqual(isValidId({}), false);
  });
});
