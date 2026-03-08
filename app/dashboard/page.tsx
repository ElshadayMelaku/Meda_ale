'use client'

import { useEffect, useState } from 'react'
import { CalendarClock, Users, History, Settings } from 'lucide-react'

interface BookingItem {
  id: string
  startTime: string
  endTime: string
  status: string
  court: {
    name: string
  }
  payment?: {
    status: string
  } | null
}

const upcomingMatches = [
  { id: 'u-1', fixture: 'City FC vs United Stars', date: 'Mar 10, 2026', venue: 'Central Park Field A' },
  { id: 'u-2', fixture: 'Night Owls vs Eagles FC', date: 'Mar 12, 2026', venue: 'Riverside Field' }
]

const menu = [
  { name: 'My Bookings', icon: CalendarClock },
  { name: 'My Teams', icon: Users },
  { name: 'Match History', icon: History },
  { name: 'Profile Settings', icon: Settings }
]

export default function UserDashboardPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBookings = async () => {
      const response = await fetch('/api/bookings', { cache: 'no-store' })
      if (!response.ok) {
        setLoading(false)
        return
      }

      const data = await response.json()
      setBookings(data.bookings || [])
      setLoading(false)
    }

    loadBookings().catch(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">User Dashboard</h2>
          <nav className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon
              return (
                <button key={item.name} type="button" className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left hover:bg-gray-50">
                  <Icon className="h-4 w-4 text-green-600" />
                  {item.name}
                </button>
              )
            })}
          </nav>
        </aside>

        <section className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">Upcoming Matches</h3>
            <div className="mt-4 space-y-3">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="p-4 border border-gray-100 rounded-lg">
                  <p className="font-medium text-gray-900">{match.fixture}</p>
                  <p className="text-sm text-gray-600">{match.date} • {match.venue}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">Booking Status</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading ? <p className="text-sm text-gray-500">Loading your bookings...</p> : null}

              {!loading && bookings.length === 0 ? (
                <p className="text-sm text-gray-500">No bookings yet. Book a court to get started.</p>
              ) : null}

              {bookings.map((booking) => {
                const start = new Date(booking.startTime)
                const end = new Date(booking.endTime)

                return (
                  <div key={booking.id} className="p-4 border border-gray-100 rounded-lg">
                    <p className="font-medium text-gray-900">{booking.court.name}</p>
                    <p className="text-sm text-gray-600">
                      {start.toLocaleDateString()} {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {' - '}
                      {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        {booking.status}
                      </span>
                      {booking.payment ? (
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                          Payment: {booking.payment.status}
                        </span>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
