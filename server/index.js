import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { resolveUser } from './auth.js';
import { requestLogger, log } from './logger.js';
import { isValidId } from './validation.js';
import * as researchStore from './research-store.js';
import * as agentsStore from './agents-store.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet({ contentSecurityPolicy: false })); // CSP often disabled when frontend is separate
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));

// Rate limit API: 100 requests per 15 minutes per IP (stricter for write routes below)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests; try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

app.use(resolveUser);
app.use(requestLogger);

// GET /api/agents — return current user's agent/block IDs (create-on-first-use)
app.get('/api/agents', async (req, res) => {
  try {
    const userId = req.userId;
    const ids = await agentsStore.getOrCreateAgents(userId);
    res.json(ids);
  } catch (e) {
    log('request_error', { path: '/api/agents', requestId: req.requestId, error: e?.message ?? String(e) });
    console.error('GET /api/agents', e);
    res.status(500).json({ error: 'Failed to get agents' });
  }
});

// GET /api/research?q=... — search my research + shared library
app.get('/api/research', async (req, res) => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q : '';
    const userId = req.userId;
    const results = await researchStore.searchResearch(q, userId);
    res.json(results);
  } catch (e) {
    log('request_error', { path: '/api/research', requestId: req.requestId, error: e?.message ?? String(e) });
    console.error('GET /api/research', e);
    res.status(500).json({ error: 'Search failed' });
  }
});

// POST /api/research — save to my research only
app.post('/api/research', async (req, res) => {
  try {
    const userId = req.userId;
    const { content, source_url, title } = req.body || {};
    const result = await researchStore.saveResearch({ content, source_url, title }, userId);
    res.status(201).json(result);
  } catch (e) {
    if (e.message?.includes('required') || e.message?.includes('valid')) {
      return res.status(400).json({ error: e.message });
    }
    log('request_error', { path: '/api/research', requestId: req.requestId, error: e?.message ?? String(e) });
    console.error('POST /api/research', e);
    res.status(500).json({ error: 'Save failed' });
  }
});

// POST /api/agents/:id/messages — proxy to Letta (body: messages, client_tools, etc.)
app.post('/api/agents/:id/messages', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ error: 'Invalid agent id' });
    }
    const body = req.body;
    const response = await agentsStore.sendMessage(id, body);
    res.json(response);
  } catch (e) {
    log('request_error', { path: '/api/agents/:id/messages', requestId: req.requestId, error: e?.message ?? String(e) });
    console.error('POST /api/agents/:id/messages', e);
    res.status(500).json({ error: 'Message failed' });
  }
});

// POST /api/workflow/update-block — update shared block with research summary (called after research step)
app.post('/api/workflow/update-block', async (req, res) => {
  try {
    const { researchBlockId, value } = req.body || {};
    if (!researchBlockId || value == null) {
      return res.status(400).json({ error: 'researchBlockId and value required' });
    }
    if (!isValidId(researchBlockId)) {
      return res.status(400).json({ error: 'Invalid researchBlockId' });
    }
    await agentsStore.updateBlock(researchBlockId, value);
    res.json({ ok: true });
  } catch (e) {
    log('request_error', { path: '/api/workflow/update-block', requestId: req.requestId, error: e?.message ?? String(e) });
    console.error('POST /api/workflow/update-block', e);
    res.status(500).json({ error: 'Update block failed' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

export { app };

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
  });
}
