import { NextResponse } from 'next/server'
import { PaymentProvider } from '@prisma/client'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const chapaSecret = process.env.CHAPA_SECRET_KEY

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { bookingId } = await request.json()
  if (!bookingId) {
    return NextResponse.json({ error: 'bookingId is required' }, { status: 400 })
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { user: true }
  })

  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  if (booking.userId !== session.user.id && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const txRef = `pitchpro-${booking.id}-${Date.now()}`

  if (!chapaSecret) {
    return NextResponse.json({ error: 'Chapa is not configured' }, { status: 501 })
  }

  const response = await fetch('https://api.chapa.co/v1/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${chapaSecret}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: booking.totalPrice,
      currency: 'ETB',
      email: booking.user.email,
      first_name: booking.user.name?.split(' ')[0] || 'Player',
      last_name: booking.user.name?.split(' ').slice(1).join(' ') || 'User',
      tx_ref: txRef,
      callback_url: `${process.env.NEXTAUTH_URL}/api/payments/verify`,
      return_url: `${process.env.NEXTAUTH_URL}/dashboard?payment=success&booking=${booking.id}`,
      customization: {
        title: 'PitchPro Booking Payment',
        description: `Booking ${booking.id}`
      }
    })
  })

  const data = await response.json()

  if (!response.ok || !data?.data?.checkout_url) {
    return NextResponse.json({ error: 'Unable to initialize Chapa payment', details: data }, { status: 400 })
  }

  await prisma.payment.upsert({
    where: { bookingId: booking.id },
    update: {
      provider: PaymentProvider.CHAPA,
      externalRef: txRef,
      checkoutUrl: data.data.checkout_url,
      rawResponse: data
    },
    create: {
      bookingId: booking.id,
      provider: PaymentProvider.CHAPA,
      amount: booking.totalPrice,
      externalRef: txRef,
      checkoutUrl: data.data.checkout_url,
      rawResponse: data
    }
  })

  return NextResponse.json({ url: data.data.checkout_url, txRef })
}
