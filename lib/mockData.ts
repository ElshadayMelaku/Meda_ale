import { Court, Team, User, Booking, CourtWithBookings, TeamWithMembers } from './types'

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    phone: '+1234567890',
    role: 'PLAYER'
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    phone: '+1234567891',
    role: 'PLAYER'
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'ADMIN'
  }
]

// Mock courts
export const mockCourts: CourtWithBookings[] = [
  {
    id: 'court-1',
    name: 'Central Park Field A',
    description: 'Well-maintained grass field in the heart of the city',
    location: 'Central Park, New York',
    pricePerHour: 50,
    imageUrl: '/courts/central-park.jpg',
    isActive: true,
    bookings: []
  },
  {
    id: 'court-2',
    name: 'Downtown Sports Complex',
    description: 'Indoor artificial turf court with lighting',
    location: 'Downtown Sports Complex, New York',
    pricePerHour: 75,
    imageUrl: '/courts/downtown-complex.jpg',
    isActive: true,
    bookings: []
  },
  {
    id: 'court-3',
    name: 'Riverside Field',
    description: 'Scenic field by the river with great views',
    location: 'Riverside Park, New York',
    pricePerHour: 60,
    imageUrl: '/courts/riverside.jpg',
    isActive: true,
    bookings: []
  }
]

// Mock teams
export const mockTeams: TeamWithMembers[] = [
  {
    id: 'team-1',
    name: 'City FC',
    description: 'Local football team looking for new players',
    sport: 'FOOTBALL',
    captainId: '1',
    inviteCode: 'ABC123',
    isActive: true,
    captain: mockUsers[0],
    members: [
      {
        id: 'member-1',
        userId: '1',
        teamId: 'team-1',
        role: 'CAPTAIN',
        joinedAt: '2024-01-01',
        user: mockUsers[0]
      },
      {
        id: 'member-2',
        userId: '2',
        teamId: 'team-1',
        role: 'MEMBER',
        joinedAt: '2024-01-15',
        user: mockUsers[1]
      }
    ]
  }
]

// Mock bookings
export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    userId: '1',
    courtId: 'court-1',
    teamId: 'team-1',
    startTime: '2024-01-20T14:00:00Z',
    endTime: '2024-01-20T16:00:00Z',
    totalPrice: 100,
    status: 'CONFIRMED',
    notes: 'Team practice session'
  }
]

// Helper functions to simulate API calls
export const getCourts = async (): Promise<CourtWithBookings[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockCourts
}

export const getCourtById = async (courtId: string): Promise<CourtWithBookings | null> => {
  await new Promise(resolve => setTimeout(resolve, 300))
  return mockCourts.find((court) => court.id === courtId) || null
}

export const getTeams = async (): Promise<TeamWithMembers[]> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockTeams
}

export const getBookings = async (): Promise<Booking[]> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockBookings
}

export const createBooking = async (bookingData: Omit<Booking, 'id'>): Promise<Booking> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const newBooking: Booking = {
    ...bookingData,
    id: `booking-${Date.now()}`
  }
  mockBookings.push(newBooking)
  return newBooking
}

export const getUsers = async (): Promise<User[]> => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockUsers
}

export const joinTeam = async (teamId: string, userId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const team = mockTeams.find(t => t.id === teamId)
  if (!team) {
    throw new Error('Team not found')
  }
  if (team.members.some(m => m.userId === userId)) {
    throw new Error('User is already a member of this team')
  }
  const user = mockUsers.find(u => u.id === userId)
  if (!user) {
    throw new Error('User not found')
  }
  team.members.push({
    id: `member-${Date.now()}`,
    userId,
    teamId,
    role: 'MEMBER',
    joinedAt: new Date().toISOString(),
    user
  })
}

export const createTeam = async (teamData: Omit<Team, 'id' | 'inviteCode' | 'isActive'>): Promise<Team> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const newTeam: Team = {
    ...teamData,
    id: `team-${Date.now()}`,
    inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
    isActive: true
  }
  mockTeams.push(newTeam as TeamWithMembers)
  return newTeam
}