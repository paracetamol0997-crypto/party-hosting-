interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipMap = new Map<string, RateLimitRecord>();

// Clean up expired records every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    ipMap.forEach((record, key) => {
      if (now > record.resetAt) {
        ipMap.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

/**
 * Rate limit helper
 * @param ip Client IP address or identifier
 * @param limit Max requests allowed in window
 * @param windowMs Time window in milliseconds (default: 60s)
 */
export function checkRateLimit(
  ip: string,
  limit: number = 6,
  windowMs: number = 60 * 1000
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = ipMap.get(ip);

  if (!record || now > record.resetAt) {
    ipMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { success: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count, resetAt: record.resetAt };
}
