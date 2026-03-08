'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Court, Team } from '@/lib/types'
import { getCourts, getTeams } from '@/lib/mockData'
import { Clock, MapPin } from 'lucide-react'

interface AvailabilityEntry {
  id: string
  startTime: string
  endTime: string
  status: string
}

function hasSlotConflict(
  requestedStart: Date,
  requestedEnd: Date,
  unavailable: AvailabilityEntry[]
) {
  return unavailable.some((entry) => {
    const start = new Date(entry.startTime)
    const end = new Date(entry.endTime)
    return requestedStart < end && requestedEnd > start
  })
}

function BookingPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { status: sessionStatus } = useSession()
  const courtId = searchParams.get('court')

  const [courts, setCourts] = useState<Court[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<string>('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [unavailableSlots, setUnavailableSlots] = useState<AvailabilityEntry[]>([])
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (courtId && courts.length > 0) {
      const court = courts.find(c => c.id === courtId)
      if (court) {
        setSelectedCourt(court)
      }
    }
  }, [courtId, courts])

  useEffect(() => {
    if (!selectedCourt || !date) {
      setUnavailableSlots([])
      return
    }

    let eventSource: EventSource | null = null

    const loadAvailability = async () => {
      const response = await fetch(
        `/api/bookings/availability?courtId=${selectedCourt.id}&date=${date}`,
        { cache: 'no-store' }
      )

      if (response.ok) {
        const data = await response.json()
        setUnavailableSlots(data.bookings || [])
      }
    }

    const subscribeAvailability = () => {
      eventSource = new EventSource(`/api/bookings/events?courtId=${selectedCourt.id}&date=${date}`)
      eventSource.addEventListener('availability', (event) => {
        const parsed = JSON.parse((event as MessageEvent).data) as AvailabilityEntry[]
        setUnavailableSlots(parsed)
      })
    }

    loadAvailability().catch(() => undefined)
    subscribeAvailability()

    return () => {
      if (eventSource) {
        eventSource.close()
      }
    }
  }, [selectedCourt, date])

  const loadData = async () => {
    try {
      const [courtsData, teamsData] = await Promise.all([
        getCourts(),
        getTeams()
      ])
      setCourts(courtsData)
      setTeams(teamsData)
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  const calculateEndTime = () => {
    if (!startTime) return ''
    const [hours, minutes] = startTime.split(':').map(Number)
    const startDate = new Date()
    startDate.setHours(hours, minutes, 0, 0)
    startDate.setHours(startDate.getHours() + duration)
    return startDate.toTimeString().slice(0, 5)
  }

  const calculateTotalPrice = () => {
    if (!selectedCourt) return 0
    return selectedCourt.pricePerHour * duration
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (sessionStatus !== 'authenticated') {
      router.push(`/signin?callbackUrl=${encodeURIComponent('/booking')}`)
      return
    }

    if (!selectedCourt || !date || !startTime) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const startDateTime = new Date(`${date}T${startTime}`)
      const endDateTime = new Date(startDateTime.getTime() + duration * 60 * 60 * 1000)

      if (hasSlotConflict(startDateTime, endDateTime, unavailableSlots)) {
        setError('This slot just became unavailable. Please choose another time.')
        setLoading(false)
        return
      }

      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          courtId: selectedCourt.id,
          teamId: selectedTeam || undefined,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          totalPrice: calculateTotalPrice(),
          paymentMethod,
          notes: ''
        })
      })

      if (bookingResponse.status === 409) {
        setError('Slot conflict detected. Please pick another slot.')
        setLoading(false)
        return
      }

      if (!bookingResponse.ok) {
        setError('Unable to create booking. Please try again.')
        setLoading(false)
        return
      }

      const bookingData = await bookingResponse.json()
      const createdBookingId = bookingData.booking?.id as string
      setBookingId(createdBookingId)

      if (paymentMethod === 'card') {
        const checkoutResponse = await fetch('/api/payments/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId: createdBookingId })
        })

        const checkoutData = await checkoutResponse.json()
        if (!checkoutResponse.ok || !checkoutData.url) {
          setError(checkoutData.error || 'Stripe checkout initialization failed')
          setLoading(false)
          return
        }

        window.location.href = checkoutData.url
        return
      }

      if (paymentMethod === 'mobile-money') {
        const checkoutResponse = await fetch('/api/payments/chapa/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId: createdBookingId })
        })

        const checkoutData = await checkoutResponse.json()
        if (!checkoutResponse.ok || !checkoutData.url) {
          setError(checkoutData.error || 'Chapa checkout initialization failed')
          setLoading(false)
          return
        }

        window.location.href = checkoutData.url
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600">Your court booking has been successfully created.</p>
          {bookingId ? <p className="text-sm text-gray-500 mt-1">Booking ID: {bookingId}</p> : null}
          <p className="text-sm text-gray-500 mt-1">Payment status: Pending confirmation</p>
          <p className="text-sm text-gray-500 mt-2">Redirecting to home page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Book a Football Court</h1>
        <p className="text-gray-600">Reserve your perfect playing time</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Court Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Select Court</h2>
            <div className="space-y-2">
              {courts.map((court) => (
                <div
                  key={court.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCourt?.id === court.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCourt(court)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{court.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {court.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        ${court.pricePerHour}/hour
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        (court as any).bookings?.length === 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {(court as any).bookings?.length === 0 ? 'Available' : 'Booked'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>

            {/* Team Selection */}
            {teams.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team (Optional)
                </label>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Individual booking</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            {unavailableSlots.length > 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm font-medium text-amber-900">Unavailable time ranges for selected date</p>
                <ul className="text-xs text-amber-800 mt-2 space-y-1">
                  {unavailableSlots.map((slot) => (
                    <li key={slot.id}>
                      {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {' - '}
                      {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (hours)
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value={1}>1 hour</option>
                <option value={2}>2 hours</option>
                <option value={3}>3 hours</option>
              </select>
            </div>

            {/* Booking Summary */}
            {selectedCourt && date && startTime && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Booking Summary</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Court: {selectedCourt.name}</div>
                  <div>Date: {new Date(date).toLocaleDateString()}</div>
                  <div>Time: {startTime} - {calculateEndTime()}</div>
                  <div>Duration: {duration} hour{duration !== 1 ? 's' : ''}</div>
                  <div className="font-medium text-gray-900 pt-2 border-t">
                    Total: ${calculateTotalPrice()}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Card Payment
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mobile-money"
                    checked={paymentMethod === 'mobile-money'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Mobile Money
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Wallet
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-3">Payment status will be tracked as Pending, Confirmed, or Refunded.</p>
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !selectedCourt}
              className="w-full"
            >
              {loading ? 'Creating Booking...' : 'Confirm Booking'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  )
}