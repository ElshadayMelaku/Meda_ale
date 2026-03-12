import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PaymentProvider } from '@prisma/client'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 501 })
  }

  const { bookingId } = await request.json()
  if (!bookingId) {
    return NextResponse.json({ error: 'bookingId is required' }, { status: 400 })
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { court: true }
  })

  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  if (booking.userId !== session.user.id && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const stripe = new Stripe(stripeSecretKey)

  const checkout = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?payment=success&booking=${booking.id}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/booking?payment=cancelled&booking=${booking.id}`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: booking.totalPrice * 100,
          product_data: {
            name: `Booking - ${booking.court.name}`,
            description: `${booking.startTime.toISOString()} - ${booking.endTime.toISOString()}`
          }
        }
      }
    ],
    metadata: {
      bookingId: booking.id,
      userId: booking.userId
    }
  })

  await prisma.payment.upsert({
    where: { bookingId: booking.id },
    update: {
      provider: PaymentProvider.STRIPE,
      externalRef: checkout.id,
      checkoutUrl: checkout.url || null,
      rawResponse: checkout as unknown as object
    },
    create: {
      bookingId: booking.id,
      provider: PaymentProvider.STRIPE,
      amount: booking.totalPrice,
      externalRef: checkout.id,
      checkoutUrl: checkout.url || null,
      rawResponse: checkout as unknown as object
    }
  })

  return NextResponse.json({ url: checkout.url })
}
