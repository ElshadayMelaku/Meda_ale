import { Calendar, Clock, Trophy } from 'lucide-react'

const matches = [
  {
    id: 'm-1',
    home: 'City FC',
    away: 'United Stars',
    date: '2026-03-10',
    time: '18:00',
    venue: 'Central Park Field A',
    status: 'Upcoming'
  },
  {
    id: 'm-2',
    home: 'Eagles FC',
    away: 'River Plate',
    date: '2026-03-12',
    time: '20:00',
    venue: 'Downtown Sports Complex',
    status: 'Upcoming'
  },
  {
    id: 'm-3',
    home: 'Pitch Masters',
    away: 'Night Owls',
    date: '2026-03-04',
    time: '19:30',
    venue: 'Riverside Field',
    status: 'Completed'
  }
]

export default function MatchesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Matches</h1>
        <p className="text-gray-600 mt-2">Track upcoming and completed matches</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {matches.map((match) => (
          <div key={match.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
                {match.status}
              </span>
              <Trophy className="h-5 w-5 text-amber-500" />
            </div>

            <div className="text-xl font-semibold text-gray-900">
              {match.home} vs {match.away}
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(match.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {match.time}
              </div>
              <div>{match.venue}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
