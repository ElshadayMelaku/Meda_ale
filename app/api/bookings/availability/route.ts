import { NextResponse } from 'next/server'
import { BookingStatus } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const courtId = searchParams.get('courtId')
  const date = searchParams.get('date')

  if (!courtId || !date) {
    return NextResponse.json({ error: 'courtId and date are required' }, { status: 400 })
  }

  const dayStart = new Date(`${date}T00:00:00.000Z`)
  const dayEnd = new Date(`${date}T23:59:59.999Z`)

  const bookings = await prisma.booking.findMany({
    where: {
      courtId,
      status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      startTime: { lte: dayEnd },
      endTime: { gte: dayStart }
    },
    select: {
      id: true,
      startTime: true,
      endTime: true,
      status: true
    },
    orderBy: { startTime: 'asc' }
  })

  return NextResponse.json({ bookings })
}
