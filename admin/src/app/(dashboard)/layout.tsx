import React from 'react';
import DashboardProviders from '@/src/providers/DashboardProviders';
import { getSession } from '@/src/lib/session';
import { redirect } from 'next/navigation';
import { TooltipProvider } from '@/src/components/ui/tooltip';
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Server-side guard: redirect to login if no active session
  const session = await getSession();
  console.log('Session in dashboard layout:', session);
  if (!session?.user) {
    redirect('/login');
  }

  
  return (
    <TooltipProvider>
      <DashboardProviders>
        {children}
      </DashboardProviders>
    </TooltipProvider>
  );
}
