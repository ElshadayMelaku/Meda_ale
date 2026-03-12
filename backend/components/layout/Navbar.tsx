'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const { status } = useSession()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-green-600">
              PitchPro
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/courts" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                Find Courts
              </Link>
              <Link href="/matches" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                Matches
              </Link>
              <Link href="/teams" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                Teams
              </Link>
              <Link href="/leaderboard" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
                Leaderboard
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {status === 'authenticated' ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/courts">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}