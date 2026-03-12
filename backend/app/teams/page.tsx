'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Team, User } from '@/lib/types'
import { getTeams, createTeam, joinTeam, getUsers } from '@/lib/mockData'
import { Users, Plus, UserPlus } from 'lucide-react'

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [teamsData, usersData] = await Promise.all([
        getTeams(),
        getUsers()
      ])
      setTeams(teamsData)
      setUsers(usersData)
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamName.trim()) {
      setError('Team name is required')
      return
    }

    setLoading(true)
    setError('')

    try {
      await createTeam({
        name: teamName.trim(),
        captainId: '1', // Mock user ID
        members: [{
          id: `member-${Date.now()}`,
          userId: '1',
          teamId: `temp-${Date.now()}`, // Will be updated by createTeam function
          role: 'CAPTAIN',
          joinedAt: new Date().toISOString()
        }]
      })

      setSuccess('Team created successfully!')
      setTeamName('')
      setShowCreateForm(false)
      await loadData() // Refresh teams list

      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError('Failed to create team. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleJoinTeam = async (teamId: string) => {
    setLoading(true)
    setError('')

    try {
      await joinTeam(teamId, '1') // Mock user ID
      await loadData() // Refresh teams list
      setSuccess('Successfully joined the team!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      setError('Failed to join team. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getTeamMembers = (team: Team) => {
    return users.filter(user => team.members?.some(member => member.userId === user.id) || false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Football Teams</h1>
          <p className="text-gray-600">Join or create teams to play together</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Team
        </Button>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Create Team Form */}
      {showCreateForm && (
        <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Team</h2>
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter team name"
                required
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Team'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowCreateForm(false)
                  setTeamName('')
                  setError('')
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => {
          const members = getTeamMembers(team)
          const captain = users.find(user => user.id === team.captainId)
          const isMember = team.members?.some(member => member.userId === '1') || false // Mock user ID

          return (
            <div
              key={team.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                  <p className="text-sm text-gray-600">
                    Captain: {captain?.name || 'Unknown'}
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  {members.length} member{members.length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Team Members */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Members:</h4>
                <div className="space-y-1">
                  {members.slice(0, 3).map((member) => (
                    <div key={member.id} className="text-sm text-gray-600 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {member.name}
                      {member.id === team.captainId && (
                        <span className="ml-1 text-xs text-gray-500">(Captain)</span>
                      )}
                    </div>
                  ))}
                  {members.length > 3 && (
                    <div className="text-sm text-gray-500">
                      +{members.length - 3} more members
                    </div>
                  )}
                </div>
              </div>

              {/* Join Button */}
              {!isMember && (
                <Button
                  onClick={() => handleJoinTeam(team.id)}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Join Team
                </Button>
              )}

              {isMember && (
                <div className="text-center text-sm text-green-600 font-medium">
                  Member of this team
                </div>
              )}
            </div>
          )
        })}
      </div>

      {teams.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teams yet</h3>
          <p className="text-gray-600 mb-4">Be the first to create a team and start playing together!</p>
          <Button onClick={() => setShowCreateForm(true)}>
            Create First Team
          </Button>
        </div>
      )}
    </div>
  )
}