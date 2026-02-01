/**
 * Security tests for API routes: validation of ids and research body.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import { app } from '../index.js';

describe('POST /api/agents/:id/messages', () => {
  it('returns 400 for agent id with unsafe characters', async () => {
    const res = await request(app)
      .post('/api/agents/agent%3Cscript%3E/messages')
      .set('Content-Type', 'application/json')
      .send({ messages: [] });
    assert.strictEqual(res.status, 400);
    assert.ok(res.body?.error?.toLowerCase().includes('invalid'));
  });

  it('returns 400 for empty agent id', async () => {
    const res = await request(app)
      .post('/api/agents//messages')
      .set('Content-Type', 'application/json')
      .send({ messages: [] });
    assert.ok(res.status === 400 || res.status === 404);
  });
});

describe('POST /api/workflow/update-block', () => {
  it('returns 400 for invalid researchBlockId', async () => {
    const res = await request(app)
      .post('/api/workflow/update-block')
      .set('Content-Type', 'application/json')
      .send({ researchBlockId: 'block<script>', value: 'x' });
    assert.strictEqual(res.status, 400);
    assert.ok(res.body?.error?.toLowerCase().includes('invalid'));
  });

  it('returns 400 when researchBlockId and value are missing', async () => {
    const res = await request(app)
      .post('/api/workflow/update-block')
      .set('Content-Type', 'application/json')
      .send({});
    assert.strictEqual(res.status, 400);
  });
});

describe('POST /api/research', () => {
  it('returns 400 for invalid source_url (non-http(s))', async () => {
    const res = await request(app)
      .post('/api/research')
      .set('Content-Type', 'application/json')
      .send({
        content: 'test',
        source_url: 'javascript:alert(1)',
        title: 'Test',
      });
    assert.strictEqual(res.status, 400);
  });

  it('returns 400 when content is missing', async () => {
    const res = await request(app)
      .post('/api/research')
      .set('Content-Type', 'application/json')
      .send({
        content: '',
        source_url: 'https://example.com',
        title: 'Test',
      });
    assert.strictEqual(res.status, 400);
  });
});
