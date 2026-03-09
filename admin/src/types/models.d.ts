// Shared types that mirror the Rails schema (see server/src/database/schema.sql)

// Role names seeded in the database
export type RoleName = 'CLIENT' | 'STAFF' | 'VENUE_ADMIN' | 'SUPER_ADMIN';

export interface Role {
  id: number;
  name: RoleName;
}

export interface User {
  id: number;
  role_id: number;
  role?: Role; // optional expanded relation (server can include role payload)
  full_name: string;
  phone_number: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Field {
  id: number;
  venue_id: number;
  name: string;
  description?: string;
  price_per_hour: number;
  average_rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: number;
  field_id: number;
  user_id: number;
  booking_date: string; // YYYY-MM-DD
  start_time: string; // HH:MM:SS
  end_time: string; // HH:MM:SS
  base_price: number;
  service_fee: number;
  total_price: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'BLOCKED' | 'REJECTED';
  payment_ref?: string | null;
  expires_at?: string | null;
  created_at: string;
  updated_at: string;
}

// Input shape expected by the API when creating a booking
export interface CreateBookingInput {
  field_id: number;
  user_id: number;
  booking_date: string; // YYYY-MM-DD
  start_time: string; // HH:MM:SS
  end_time: string; // HH:MM:SS
}

// Authentication-related types (admin side)
export interface LoginInput {
  phone_number: string;
  password: string;
}

export interface AuthResponse {
  token: string; // JWT or access token returned by Rails
  expires_at?: string; // optional expiry ISO timestamp
  user: User & { role?: Role };
}

export type Permission =
  | 'bookings.read' | 'bookings.create' | 'bookings.update' | 'bookings.delete'
  | 'users.read' | 'users.manage'
  | 'venues.read' | 'venues.manage'
  | 'reports.view'
  | 'admin.*';

export interface Session {
  token: string | null;
  user: User | null;
  permissions?: Permission[];
}

// Lightweight helper types for RBAC checks in the admin UI
// Roles considered administrative for this admin app
export const ADMIN_ROLES: RoleName[];

