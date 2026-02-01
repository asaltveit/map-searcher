/**
 * Tests for server/auth.js (security: user id sanitization).
 */
import { describe, it, afterEach } from 'node:test';
import assert from 'node:assert';
import { resolveUser } from '../auth.js';

describe('resolveUser', () => {
  const orig = process.env.ENABLE_HYBRID_MULTI_USER;

  afterEach(() => {
    process.env.ENABLE_HYBRID_MULTI_USER = orig;
  });

  it('strips unsafe characters from X-User-Id header when hybrid mode', (t, done) => {
    process.env.ENABLE_HYBRID_MULTI_USER = 'true';
    const req = {
      headers: { 'x-user-id': 'user<script>alert(1)</script>' },
      cookies: {},
    };
    const res = { cookie: () => {} };
    resolveUser(req, res, () => {
      assert.strictEqual(req.userId, 'userscriptalert1script');
      done();
    });
  });

  it('caps X-User-Id at 128 chars when hybrid mode', (t, done) => {
    process.env.ENABLE_HYBRID_MULTI_USER = 'true';
    const req = {
      headers: { 'x-user-id': 'a'.repeat(200) },
      cookies: {},
    };
    const res = { cookie: () => {} };
    resolveUser(req, res, () => {
      assert.ok(req.userId.length <= 128);
      done();
    });
  });

  it('falls back to default when header is empty after sanitization', (t, done) => {
    process.env.ENABLE_HYBRID_MULTI_USER = 'true';
    const req = {
      headers: { 'x-user-id': '!!!' },
      cookies: {},
    };
    const res = { cookie: () => {} };
    resolveUser(req, res, () => {
      assert.strictEqual(req.userId, 'default');
      done();
    });
  });
});
