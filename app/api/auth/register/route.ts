import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { UserRole } from '@prisma/client'
import { prisma } from '@/lib/prisma'

const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['PLAYER', 'OWNER']).default('PLAYER')
})

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const data = registerSchema.parse(json)

    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        passwordHash,
        role: data.role as UserRole
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }

    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
