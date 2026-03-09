"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {Input} from '@/src/components/ui/input';
import {Button}  from '@/src/components/ui/button';
import { useAuth } from '@/src/providers/AuthProvider';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const user = await login({ phone_number: phone, password });
      if (!user) {
        setError('Invalid credentials');
        import('@/src/lib/toast').then(({ errorToast }) => errorToast('Login failed'));
        setIsLoading(false);
        return;
      }
      import('@/src/lib/toast').then(({ successToast }) => successToast('Signed in'));
      router.push('/');
    } catch (err: any) {
      const msg = err?.message || 'Login failed';
      setError(msg);
      import('@/src/lib/toast').then(({ errorToast }) => errorToast(msg));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="">
    <form onSubmit={submit} className="w-full">
      <label className="block mb-3">
        <span className="text-sm text-muted-foreground">Phone number</span>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </label>

      <label className="block mb-4">
        <span className="text-sm text-muted-foreground">Password</span>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>

      <Button type="submit" disabled={isLoading}>{isLoading ? 'Signing in…' : 'Sign in'}</Button>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
    </form>

    <div className="flex w-full justify-end mt-8">
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground hover:text-primary "
          >
            Forgot your password?
          </Link>
        </div>
        </div>
  );
}
