import { cookies } from 'next/headers';

const API_BASE = process.env.RAILS_API_URL || process.env.NEXT_PUBLIC_RAILS_API_URL || 'http://localhost:3000';

type FetchOptions = RequestInit & { token?: string };

async function parseJSON(response: Response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch (e) {
    return text;
  }
}

async function getServerTokenFromCookies() {
  try {
    // In some Next versions cookies() can be async or return directly.
    // Awaiting is safe either way.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ck = await cookies();
    // use a flexible access to avoid strict type issues across Next versions
    const get = (ck as any)?.get;
    const tokenCookie = (typeof get === 'function' && (get.call(ck, 'jwt') || get.call(ck, 'access_token'))) || null;
    return tokenCookie?.value ?? null;
  } catch (e) {
    return null;
  }
}

async function apiFetch(path: string, options: FetchOptions = {}) {
  const url = new URL(path, API_BASE).toString();

  const headers: Record<string, string> = {
    'Accept': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };

  // If token explicitly provided (useful for client calls), use it.
  let token = options.token;

  // If no token provided and running on server, try cookies()
  if (!token) {
    token = await getServerTokenFromCookies();
  }

  if (token) headers['Authorization'] = `Bearer ${token}`;

  const fetchOptions: RequestInit = {
    method: options.method ?? 'GET',
    headers,
    body: options.body,
    cache: options.cache,
  };

  const res = await fetch(url, fetchOptions);

  const payload = await parseJSON(res);

  if (!res.ok) {
    const err: any = new Error(payload?.message || `Request failed with status ${res.status}`);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}

export const api = {
  get: async (path: string, opts: FetchOptions = {}) => apiFetch(path, { ...opts, method: 'GET' }),
  post: async (path: string, data?: any, opts: FetchOptions = {}) =>
    apiFetch(path, {
      ...opts,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(opts.headers as any) },
      body: data ? JSON.stringify(data) : undefined,
    }),
  put: async (path: string, data?: any, opts: FetchOptions = {}) =>
    apiFetch(path, {
      ...opts,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...(opts.headers as any) },
      body: data ? JSON.stringify(data) : undefined,
    }),
  del: async (path: string, opts: FetchOptions = {}) => apiFetch(path, { ...opts, method: 'DELETE' }),
};

export default api;
