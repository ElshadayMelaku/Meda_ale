import { Trophy, Medal } from 'lucide-react'

const teams = [
  { name: 'City FC', played: 14, wins: 10, draws: 2, losses: 2, points: 32 },
  { name: 'Eagles FC', played: 14, wins: 9, draws: 3, losses: 2, points: 30 },
  { name: 'United Stars', played: 14, wins: 8, draws: 2, losses: 4, points: 26 },
  { name: 'Pitch Masters', played: 14, wins: 7, draws: 3, losses: 4, points: 24 },
  { name: 'Night Owls', played: 14, wins: 5, draws: 2, losses: 7, points: 17 }
]

export default function LeaderboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        <p className="text-gray-600 mt-2">Team rankings and competition standings</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Team</th>
                <th className="px-4 py-3 text-left">P</th>
                <th className="px-4 py-3 text-left">W</th>
                <th className="px-4 py-3 text-left">D</th>
                <th className="px-4 py-3 text-left">L</th>
                <th className="px-4 py-3 text-left">PTS</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team.name} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {index === 0 ? <Trophy className="h-4 w-4 text-amber-500" /> : null}
                      {index === 1 ? <Medal className="h-4 w-4 text-gray-400" /> : null}
                      {index === 2 ? <Medal className="h-4 w-4 text-amber-700" /> : null}
                      <span>{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{team.name}</td>
                  <td className="px-4 py-3">{team.played}</td>
                  <td className="px-4 py-3">{team.wins}</td>
                  <td className="px-4 py-3">{team.draws}</td>
                  <td className="px-4 py-3">{team.losses}</td>
                  <td className="px-4 py-3 font-semibold text-green-700">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
