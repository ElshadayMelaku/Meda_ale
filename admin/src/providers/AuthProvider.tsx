"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, LoginInput, Permission } from '../types/models';

type AuthContextType = {
  user: User | null;
  permissions?: Permission[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (creds: LoginInput) => Promise<User | null>;
  logout: () => Promise<void>;
  refresh: () => Promise<User | null>;
  setUser: (u: User | null, perms?: Permission[] | undefined) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'admin:auth:user';

async function fetchSession(): Promise<{ user: User | null; permissions?: Permission[] } | null> {
  try {
    const res = await fetch('/api/auth/session', { cache: 'no-store' });
    if (!res.ok) return null;
    const payload = await res.json();
    return { user: payload?.user ?? null, permissions: payload?.permissions };
  } catch (e) {
    return null;
  }
}

export const AuthProvider: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(() => {
    try {
      const raw = typeof window !== 'undefined' ? sessionStorage.getItem(STORAGE_KEY) : null;
      return raw ? (JSON.parse(raw) as User) : null;
    } catch (e) {
      return null;
    }
  });

  const [permissions, setPermissions] = useState<Permission[] | undefined>(() => {
    try {
      const raw = typeof window !== 'undefined' ? sessionStorage.getItem(`${STORAGE_KEY}:perms`) : null;
      return raw ? (JSON.parse(raw) as Permission[]) : undefined;
    } catch (e) {
      return undefined;
    }
  });

  const [loading, setLoading] = useState<boolean>(!user);
  const [error, setError] = useState<string | null>(null);

  const setUser = useCallback((u: User | null, perms?: Permission[] | undefined) => {
    setUserState(u);
    setPermissions(perms);
    try {
      if (u) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else sessionStorage.removeItem(STORAGE_KEY);
      if (perms) sessionStorage.setItem(`${STORAGE_KEY}:perms`, JSON.stringify(perms));
      else sessionStorage.removeItem(`${STORAGE_KEY}:perms`);
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  const refresh = useCallback(async (): Promise<User | null> => {
    setLoading(true);
    const s = await fetchSession();
    setUser(s?.user ?? null, s?.permissions);
    setLoading(false);
    return s?.user ?? null;
  }, [setUser]);

  useEffect(() => {
    // On mount try to refresh server-side session. If we already had a cached user
    // keep it visible until refresh completes.
    let mounted = true;
    (async () => {
      try {
        const s = await fetchSession();
        if (!mounted) return;
  if (s) setUser(s.user ?? null, s.permissions);
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [setUser]);

  async function login(creds: LoginInput): Promise<User | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds),
      });

      const data = await res.json();
      if (!res.ok) {
        const msg = data?.error || 'Login failed';
        setError(msg);

        // Development / fallback behaviour: try to call the dev-login endpoint
        // which sets an HttpOnly cookie and returns a fake user. This mirrors
        // the real server behaviour so server-side guards (SSR/layouts) will
        // see the session via cookies.
        const allowFake = (process.env.NEXT_PUBLIC_FAKE_AUTH === 'true') || (process.env.FAKE_AUTH === 'true') || (process.env.NODE_ENV !== 'production');
        if (allowFake) {
          try {
            const devRes = await fetch('/api/auth/dev-login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(creds),
            });
            const devData = await devRes.json();
            if (devRes.ok) {
              const u = devData?.user ?? null;
              const perms = devData?.permissions ?? undefined;
              setUser(u, perms);
              setLoading(false);
              return u;
            }
          } catch (e) {
            // fall through to client-only fake below
          }

          // Fallback: create a client-only fake user if dev endpoint failed.
          const fakeUser: User = {
            id: 1,
            role_id: 4,
            full_name: `Dev User (${creds.phone_number || 'dev'})`,
            phone_number: creds.phone_number ?? '0000000000',
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as User;
          setUser(fakeUser, undefined);
          setLoading(false);
          return fakeUser;
        }

        setLoading(false);
        return null;
      }

  const u: User | null = data?.user ?? null;
  const perms = data?.permissions ?? undefined;
  setUser(u, perms);
      setLoading(false);
      return u;
    } catch (err: any) {
      setError(err?.message || 'Login failed');

      const allowFake = (process.env.NEXT_PUBLIC_FAKE_AUTH === 'true') || (process.env.FAKE_AUTH === 'true') || (process.env.NODE_ENV !== 'production');
      if (allowFake) {
        try {
          const devRes = await fetch('/api/auth/dev-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(creds),
          });
          const devData = await devRes.json();
          if (devRes.ok) {
            const u = devData?.user ?? null;
            const perms = devData?.permissions ?? undefined;
            setUser(u, perms);
            setLoading(false);
            return u;
          }
        } catch (e) {
          // ignore and fall back to client-only fake below
        }

        const fakeUser: User = {
          id: 1,
          role_id: 4,
          full_name: `Dev User (${creds.phone_number || 'dev'})`,
          phone_number: creds.phone_number ?? '0000000000',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as User;
        setUser(fakeUser, undefined);
        setLoading(false);
        return fakeUser;
      }

      setLoading(false);
      return null;
    }
  }

  async function logout(): Promise<void> {
    setLoading(true);
    try {
      // call server to clear cookie
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    } finally {
      setUser(null, undefined);
      setLoading(false);
    }
  }

  const value: AuthContextType = {
    user,
    permissions,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    refresh,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
