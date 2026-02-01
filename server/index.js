import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { resolveUser } from './auth.js';
import { requestLogger, log } from './logger.js';
import { isValidId } from './validation.js';
import { trace } from './tracing.js';
import * as researchStore from './research-store.js';
import * as agentsStore from './agents-store.js';

// Helper to wrap route handlers with Weave tracing
const traceRoute = (name, handler) => async (req, res, next) => {
  return trace(name, () => handler(req, res, next));
};

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
app.get('/api/agents', traceRoute('GET /api/agents', async (req, res) => {
  try {
    const userId = req.userId;
    const ids = await agentsStore.getOrCreateAgents(userId);
    res.json(ids);
  } catch (e) {
    log('request_error', { path: '/api/agents', requestId: req.requestId, error: e?.message ?? String(e) });
    console.error('GET /api/agents', e);
    res.status(500).json({ error: 'Failed to get agents' });
  }
}));

// GET /api/research?q=... — search my research + shared library
app.get('/api/research', traceRoute('GET /api/research', async (req, res) => {
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
}));

// POST /api/research — save to my research only
app.post('/api/research', traceRoute('POST /api/research', async (req, res) => {
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
}));

// POST /api/agents/:id/messages — proxy to Letta (body: messages, client_tools, etc.)
app.post('/api/agents/:id/messages', traceRoute('POST /api/agents/:id/messages', async (req, res) => {
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
}));

// POST /api/workflow/update-block — update shared block with research summary (called after research step)
app.post('/api/workflow/update-block', traceRoute('POST /api/workflow/update-block', async (req, res) => {
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
}));

// POST /api/improvements — submit improvement request (JWT + string) to storage API (built separately)
// Body: { improvement: string }. Forward Authorization header to IMPROVEMENT_STORAGE_URL if set.
app.post('/api/improvements', async (req, res) => {
  try {
    const improvement = typeof (req.body && req.body.improvement) === 'string' ? req.body.improvement.trim() : '';
    if (!improvement) {
      return res.status(400).json({ error: 'improvement string required' });
    }
    const storageUrl = process.env.IMPROVEMENT_STORAGE_URL;
    if (!storageUrl) {
      return res.status(501).json({ error: 'Improvement storage not configured (IMPROVEMENT_STORAGE_URL)' });
    }
    const authHeader = req.headers.authorization;
    const response = await fetch(storageUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify({ improvement }),
    });
    if (!response.ok) {
      const text = await response.text();
      log('request_error', { path: '/api/improvements', requestId: req.requestId, upstreamStatus: response.status });
      return res.status(response.status).json({ error: text || 'Storage API error' });
    }
    const data = await response.json().catch(() => ({}));
    res.status(201).json(data);
  } catch (e) {
    log('request_error', { path: '/api/improvements', requestId: req.requestId, error: e?.message ?? String(e) });
    console.error('POST /api/improvements', e);
    res.status(500).json({ error: 'Failed to submit improvement' });
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
