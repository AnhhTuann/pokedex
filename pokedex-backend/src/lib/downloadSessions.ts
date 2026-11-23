import { randomBytes } from 'node:crypto';

export const MAX_DOWNLOAD_BYTES = 2 * 1024 * 1024;
const DEFAULT_TTL_MS = 60_000;
const DEFAULT_MAX_SESSIONS = 100;

export interface DownloadSession {
  filename: string;
  mimeType: string;
  data: Buffer;
  expiresAt: number;
}

/** Keeps Content-Disposition safe regardless of client-supplied filenames. */
export function sanitizeDownloadFilename(input: unknown): string {
  if (typeof input !== 'string') throw new Error('Invalid filename');
  const baseName = input.split(/[\\/]/).pop() ?? '';
  const safe = baseName.replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 128);
  if (!safe || safe === '.' || safe === '..') throw new Error('Invalid filename');
  return safe;
}

export function validateMimeType(input: unknown): string {
  if (
    typeof input !== 'string' ||
    input.length > 100 ||
    !/^[A-Za-z0-9!#$&^_.+-]+\/[A-Za-z0-9!#$&^_.+-]+$/.test(input)
  ) {
    throw new Error('Invalid mime type');
  }
  return input;
}

export function decodeDownloadContent(content: unknown, isBase64?: unknown): Buffer {
  if (typeof content !== 'string') throw new Error('Invalid content');
  const data = isBase64
    ? Buffer.from(content, 'base64')
    : Buffer.from(content, 'utf8');
  if (data.length === 0 || data.length > MAX_DOWNLOAD_BYTES) {
    throw new Error('Content is empty or too large');
  }
  return data;
}

/** In-memory, single-use, expiring download tokens with an upper bound. */
export class DownloadSessionStore {
  private readonly sessions = new Map<string, DownloadSession>();

  constructor(
    private readonly ttlMs: number = DEFAULT_TTL_MS,
    private readonly maxSessions: number = DEFAULT_MAX_SESSIONS,
    private readonly now: () => number = Date.now,
    private readonly createToken: () => string = () => randomBytes(32).toString('hex'),
  ) {}

  get size(): number {
    return this.sessions.size;
  }

  create(input: {
    filename: unknown;
    mimeType: unknown;
    content: unknown;
    isBase64?: unknown;
  }): string {
    const filename = sanitizeDownloadFilename(input.filename);
    const mimeType = validateMimeType(input.mimeType);
    const data = decodeDownloadContent(input.content, input.isBase64);

    this.purgeExpired();
    if (this.sessions.size >= this.maxSessions) {
      const oldest = this.sessions.keys().next().value;
      if (oldest !== undefined) this.sessions.delete(oldest);
    }

    const token = this.createToken();
    this.sessions.set(token, {
      filename,
      mimeType,
      data,
      expiresAt: this.now() + this.ttlMs,
    });
    return token;
  }

  /** Consumes the token: a download link works exactly once. */
  take(token: string): DownloadSession | null {
    const session = this.sessions.get(token);
    if (!session) return null;
    this.sessions.delete(token);
    if (session.expiresAt <= this.now()) return null;
    return session;
  }

  private purgeExpired(): void {
    const now = this.now();
    for (const [token, session] of this.sessions) {
      if (session.expiresAt <= now) this.sessions.delete(token);
    }
  }
}
