'use client';
import Dashboard from '@/src/components/dashboard/dashboard';
import {Button} from '@/src/components/ui/button';
import { useHasPermission } from '@/src/lib/permissionClient';

export default function DashboardPage() {
  const canViewBookings = useHasPermission('bookings.read');

  return (
    <main className="p-6">
      
      <div className="mt-6">
        <Dashboard />
      </div>
    </main>
  );
}
