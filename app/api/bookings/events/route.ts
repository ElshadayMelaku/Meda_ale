import { BookingStatus } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getBookingSnapshot(courtId: string, date: string) {
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
      status: true,
      updatedAt: true
    },
    orderBy: { startTime: 'asc' }
  })

  return JSON.stringify(bookings)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const courtId = searchParams.get('courtId')
  const date = searchParams.get('date')

  if (!courtId || !date) {
    return new Response('courtId and date are required', { status: 400 })
  }

  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  const encoder = new TextEncoder()

  let previous = ''
  let closed = false

  const writeMessage = async (event: string, data: string) => {
    if (closed) return
    await writer.write(encoder.encode(`event: ${event}\ndata: ${data}\n\n`))
  }

  const heartbeat = setInterval(async () => {
    try {
      const snapshot = await getBookingSnapshot(courtId, date)
      if (snapshot !== previous) {
        previous = snapshot
        await writeMessage('availability', snapshot)
      } else {
        await writeMessage('heartbeat', JSON.stringify({ ts: Date.now() }))
      }
    } catch {
      await writeMessage('error', JSON.stringify({ message: 'Unable to poll availability' }))
    }
  }, 5000)

  const initial = await getBookingSnapshot(courtId, date)
  previous = initial
  await writeMessage('availability', initial)

  request.signal.addEventListener('abort', async () => {
    clearInterval(heartbeat)
    closed = true
    await writer.close()
  })

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive'
    }
  })
}
