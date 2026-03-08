import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CourtWithBookings } from '@/lib/types'

interface CourtCardProps {
  court: CourtWithBookings
}

export function CourtCard({ court }: CourtCardProps) {
  const isAvailable = court.bookings.length === 0

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200">
        {court.imageUrl ? (
          <Image
            src={court.imageUrl}
            alt={court.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-green-100">
            <div className="text-green-600 text-4xl">⚽</div>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isAvailable
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {isAvailable ? 'Available' : 'Booked'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{court.name}</h3>

        {court.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{court.description}</p>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-2" />
            {court.location}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="h-4 w-4 mr-2" />
            ${court.pricePerHour}/hour
          </div>
        </div>

        <div className="flex space-x-2">
          <Link href={`/courts/${court.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Link href={`/booking?court=${court.id}`} className="flex-1">
            <Button
              className="w-full"
              disabled={!isAvailable}
            >
              {isAvailable ? 'Book Now' : 'Unavailable'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}