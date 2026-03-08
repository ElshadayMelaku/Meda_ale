import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { BookingStatus, PaymentProvider, PaymentStatus } from '@prisma/client'
import { prisma } from '@/lib/prisma'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const chapaSecret = process.env.CHAPA_SECRET_KEY

async function verifyChapa(reference: string) {
  if (!chapaSecret) {
    return { error: 'Chapa is not configured', status: 501 }
  }

  const response = await fetch(`https://api.chapa.co/v1/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${chapaSecret}`
    }
  })

  const data = await response.json()
  const payment = await prisma.payment.findFirst({
    where: {
      externalRef: reference,
      provider: PaymentProvider.CHAPA
    }
  })

  if (!payment) {
    return { error: 'Payment record not found', status: 404 }
  }

  const succeeded = response.ok && data?.status === 'success' && data?.data?.status === 'success'

  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: succeeded ? PaymentStatus.SUCCEEDED : PaymentStatus.FAILED,
      rawResponse: data
    }
  })

  await prisma.booking.update({
    where: { id: payment.bookingId },
    data: {
      status: succeeded ? BookingStatus.CONFIRMED : BookingStatus.CANCELLED
    }
  })

  return {
    ok: true,
    bookingId: payment.bookingId,
    bookingStatus: succeeded ? 'CONFIRMED' : 'CANCELLED',
    statusCode: 200
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  const provider = body.provider as 'stripe' | 'chapa'
  const reference = body.reference as string

  if (!provider || !reference) {
    return NextResponse.json({ error: 'provider and reference are required' }, { status: 400 })
  }

  if (provider === 'stripe') {
    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'Stripe is not configured' }, { status: 501 })
    }

    const stripe = new Stripe(stripeSecretKey)
    const checkout = await stripe.checkout.sessions.retrieve(reference)
    const bookingId = checkout.metadata?.bookingId

    if (!bookingId) {
      return NextResponse.json({ error: 'Invalid Stripe session metadata' }, { status: 400 })
    }

    const succeeded = checkout.payment_status === 'paid'

    await prisma.payment.updateMany({
      where: { bookingId, provider: PaymentProvider.STRIPE },
      data: {
        status: succeeded ? PaymentStatus.SUCCEEDED : PaymentStatus.FAILED,
        rawResponse: checkout as unknown as object
      }
    })

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: succeeded ? BookingStatus.CONFIRMED : BookingStatus.CANCELLED }
    })

    return NextResponse.json({ ok: true, bookingId, status: succeeded ? 'CONFIRMED' : 'CANCELLED' })
  }

  const result = await verifyChapa(reference)
  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: result.status })
  }

  return NextResponse.json({ ok: true, bookingId: result.bookingId, status: result.bookingStatus })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const reference = searchParams.get('tx_ref') || searchParams.get('trx_ref') || searchParams.get('reference')

  if (!reference) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?payment=error`)
  }

  const result = await verifyChapa(reference)
  if ('error' in result) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard?payment=error`)
  }

  return NextResponse.redirect(
    `${process.env.NEXTAUTH_URL}/dashboard?payment=${result.bookingStatus.toLowerCase()}&booking=${result.bookingId}`
  )
}
