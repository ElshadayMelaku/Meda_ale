import { NextResponse } from 'next/server'
import { z } from 'zod'
import { BookingStatus, PaymentProvider } from '@prisma/client'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const bookingSchema = z.object({
  courtId: z.string().min(1),
  teamId: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  totalPrice: z.number().positive(),
  paymentMethod: z.string().optional(),
  notes: z.string().optional()
})

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const where = session.user.role === 'ADMIN'
    ? {}
    : { userId: session.user.id }

  const bookings = await prisma.booking.findMany({
    where,
    include: {
      court: true,
      payment: true
    },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json({ bookings })
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json()
  const parsed = bookingSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { courtId, teamId, startTime, endTime, totalPrice, paymentMethod, notes } = parsed.data

  const start = new Date(startTime)
  const end = new Date(endTime)

  if (end <= start) {
    return NextResponse.json({ error: 'Invalid booking time range' }, { status: 400 })
  }

  const court = await prisma.court.findUnique({ where: { id: courtId } })
  if (!court) {
    return NextResponse.json({ error: 'Court not found' }, { status: 404 })
  }

  const conflicting = await prisma.booking.findFirst({
    where: {
      courtId,
      status: {
        in: [BookingStatus.PENDING, BookingStatus.CONFIRMED]
      },
      startTime: { lt: end },
      endTime: { gt: start }
    }
  })

  if (conflicting) {
    return NextResponse.json(
      { error: 'Selected time slot is no longer available', conflictBookingId: conflicting.id },
      { status: 409 }
    )
  }

  const booking = await prisma.booking.create({
    data: {
      userId: session.user.id,
      courtId,
      teamId,
      startTime: start,
      endTime: end,
      totalPrice: Math.round(totalPrice),
      status: BookingStatus.PENDING,
      paymentMethod,
      notes
    },
    include: {
      court: true
    }
  })

  if (paymentMethod === 'card' || paymentMethod === 'mobile-money') {
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        provider: paymentMethod === 'card' ? PaymentProvider.STRIPE : PaymentProvider.CHAPA,
        amount: booking.totalPrice
      }
    })
  }

  return NextResponse.json({ booking }, { status: 201 })
}
