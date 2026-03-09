"use server";

import api from '../lib/api-client';
import { revalidateTag } from 'next/cache';
import type { CreateBookingInput, Booking } from '../types/models';

/**
 * Server Action to create a booking in Rails and revalidate booking cache/tag.
 * This runs on the server and automatically has access to cookies() via api-client.
 */
export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  // Explicit 'use server' above makes this a Server Action in Next.js App Router.
  const payload = await api.post('/bookings', { booking: input });

  // Revalidate pages/components that used the 'bookings' tag
  try {
  // second arg is an optional path in some Next versions; provide a default root path
  revalidateTag('bookings', '/');
  } catch (e) {
    // If revalidateTag isn't available in some environments, swallow the error
    // but surface the booking result.
    // Optionally log to a monitoring service here.
  }

  return payload as Booking;
}
