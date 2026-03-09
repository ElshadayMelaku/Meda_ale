import api from '../lib/api-client';
import type { Booking, CreateBookingInput } from '../types/models';

export const bookingService = {
  list: async (): Promise<Booking[]> => {
    return api.get('/bookings');
  },
  create: async (payload: CreateBookingInput): Promise<Booking> => {
    return api.post('/bookings', { booking: payload });
  },
  get: async (id: number): Promise<Booking> => {
    return api.get(`/bookings/${id}`);
  },
};
