/**
 * Resolve user identity for hybrid multi-user.
 * In dev: use X-User-Id header or anonymous stable id from cookie.
 * Do not expose secrets; only user_id is attached to req.
 */
import crypto from 'crypto';

const ANON_COOKIE = 'weave_hacks_user_id';

export function resolveUser(req, res, next) {
  const enableHybrid = process.env.ENABLE_HYBRID_MULTI_USER === 'true';
  if (!enableHybrid) {
    req.userId = 'default';
    return next();
  }
  const headerId = req.headers['x-user-id'];
  if (headerId && typeof headerId === 'string' && headerId.length <= 128) {
    req.userId = headerId.replace(/[^a-zA-Z0-9_-]/g, '');
    if (!req.userId) req.userId = 'default';
    return next();
  }
  let cookieId = req.cookies?.[ANON_COOKIE];
  if (cookieId && typeof cookieId === 'string' && cookieId.length <= 128) {
    req.userId = cookieId.replace(/[^a-zA-Z0-9_-]/g, '') || 'default';
    return next();
  }
  const newId = 'anon_' + crypto.randomUUID().replace(/-/g, '');
  req.userId = newId;
  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie(ANON_COOKIE, newId, {
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60 * 1000,
    secure: isProduction,
    sameSite: isProduction ? 'lax' : 'lax',
  });
  next();
}
