import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, MapPin, Star, Wifi, Car, ShowerHead, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getCourtById } from '@/lib/mockData'

interface CourtDetailPageProps {
  params: Promise<{
    id: string
  }>
}

const amenities = [
  { name: 'Parking', icon: Car },
  { name: 'Changing Room', icon: ShowerHead },
  { name: 'Wi-Fi', icon: Wifi },
  { name: 'Security', icon: ShieldCheck }
]

const availableSlots = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']

export default async function CourtDetailPage({ params }: CourtDetailPageProps) {
  const { id } = await params
  const court = await getCourtById(id)

  if (!court) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="h-72 bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center text-white text-6xl">
              ⚽
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-3xl font-bold text-gray-900">{court.name}</h1>
              <div className="flex items-center text-amber-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-gray-700 ml-1 font-medium">4.7</span>
              </div>
            </div>

            <p className="mt-3 text-gray-600 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {court.location}
            </p>

            <p className="mt-4 text-gray-700">
              {court.description || 'Modern football court with quality turf, floodlights, and a comfortable play experience for all levels.'}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {amenities.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.name} className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-center">
                    <Icon className="h-5 w-5 mx-auto text-green-600" />
                    <div className="text-sm mt-2 text-gray-700">{item.name}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Available Time Slots</h2>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className="px-3 py-2 rounded-lg border border-gray-300 hover:border-green-500 hover:text-green-700 text-sm"
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {court.pricePerHour}/hour
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Real-time availability
              </div>
            </div>

            <Link href={`/booking?court=${court.id}`} className="block mt-6">
              <Button className="w-full">Book Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
