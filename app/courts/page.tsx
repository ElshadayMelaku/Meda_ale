'use client'

import { useEffect, useMemo, useState } from 'react'
import { CourtCard } from '@/components/courts/CourtCard'
import { CourtWithBookings } from '@/lib/types'
import { getCourts } from '@/lib/mockData'

export default function CourtsPage() {
  const [courts, setCourts] = useState<CourtWithBookings[]>([])
  const [loading, setLoading] = useState(true)
  const [showMap, setShowMap] = useState(false)
  const [priceRange, setPriceRange] = useState(120)
  const [rating, setRating] = useState(0)
  const [availabilityOnly, setAvailabilityOnly] = useState(false)
  const [subcity, setSubcity] = useState('All')

  useEffect(() => {
    const loadCourts = async () => {
      const data = await getCourts()
      setCourts(data)
      setLoading(false)
    }

    loadCourts()
  }, [])

  const subcities = useMemo(() => {
    const unique = new Set(courts.map((court) => court.location.split(',')[0]?.trim() || 'Unknown'))
    return ['All', ...Array.from(unique)]
  }, [courts])

  const filteredCourts = useMemo(() => {
    return courts.filter((court) => {
      const courtRating = 4.5
      const courtSubcity = court.location.split(',')[0]?.trim() || 'Unknown'
      const available = court.bookings.length === 0

      if (court.pricePerHour > priceRange) return false
      if (rating > 0 && courtRating < rating) return false
      if (availabilityOnly && !available) return false
      if (subcity !== 'All' && courtSubcity !== subcity) return false

      return true
    })
  }, [courts, priceRange, rating, availabilityOnly, subcity])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Football Courts</h1>
          <p className="text-gray-600">Find and book the perfect football court for your game</p>
        </div>

        <button
          type="button"
          onClick={() => setShowMap((prev) => !prev)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:border-green-500 hover:text-green-700"
        >
          {showMap ? 'Hide Map View' : 'Show Map View'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range: ${priceRange}
            </label>
            <input
              type="range"
              min={20}
              max={150}
              step={5}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value={0}>Any</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
              <option value={4.5}>4.5+</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subcity</label>
            <select
              value={subcity}
              onChange={(e) => setSubcity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {subcities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={availabilityOnly}
              onChange={(e) => setAvailabilityOnly(e.target.checked)}
            />
            Available courts only
          </label>
        </aside>

        <section className="lg:col-span-3 space-y-6">
          {showMap ? (
            <div className="h-64 rounded-xl border border-dashed border-green-300 bg-green-50 flex items-center justify-center text-green-700 text-sm">
              Map view placeholder with court markers
            </div>
          ) : null}

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading courts...</div>
          ) : filteredCourts.length === 0 ? (
            <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
              <div className="text-gray-500 text-lg">No courts match your filters.</div>
              <div className="text-gray-400 text-sm mt-2">Try adjusting price range, rating, or availability.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourts.map((court) => (
                <CourtCard key={court.id} court={court} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}