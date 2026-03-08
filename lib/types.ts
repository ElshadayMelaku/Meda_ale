// Mock data types for frontend-only application

export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  role?: string
}

export interface Court {
  id: string
  name: string
  description?: string
  location: string
  pricePerHour: number
  imageUrl?: string
  isActive?: boolean
  bookings?: Booking[]
}

export interface Booking {
  id: string
  userId: string
  courtId: string
  teamId?: string
  startTime: string
  endTime: string
  totalPrice: number
  status?: string
  paymentMethod?: string
  paymentStatus?: string
  notes?: string
}

export interface Team {
  id: string
  name: string
  description?: string
  sport?: string
  captainId: string
  inviteCode?: string
  isActive?: boolean
  members?: TeamMember[]
}

export interface TeamMember {
  id: string
  userId: string
  teamId: string
  role?: string
  joinedAt?: string
  user?: User
}

export type UserRole = 'PLAYER' | 'OWNER' | 'ADMIN'
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
export type SportType = 'FOOTBALL' | 'BASKETBALL' | 'TENNIS' | 'VOLLEYBALL'
export type TeamMemberRole = 'CAPTAIN' | 'MEMBER'

export interface CourtWithBookings extends Court {
  bookings: Booking[]
}

export interface TeamWithMembers extends Team {
  members: (TeamMember & { user: User })[]
  captain: User
}

export interface BookingWithDetails extends Booking {
  user: User
  court: Court
  team?: TeamWithMembers
}

export interface UserWithTeams extends User {
  teams: (TeamMember & { team: Team })[]
  captainTeams: Team[]
}