import { NextResponse } from 'next/server';
import { requirePermission } from '@/src/lib/requirePermission';

export async function GET() {
  // Require bookings.read permission to access this endpoint
  await requirePermission('bookings.read');

  // Return some sample protected data
  return NextResponse.json({ secret: 'This is protected booking data' });
}
