import bcrypt from 'bcryptjs'
import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@pitchpro.com' },
    update: {},
    create: {
      email: 'admin@pitchpro.com',
      name: 'Admin User',
      passwordHash,
      role: UserRole.ADMIN
    }
  })

  const owner = await prisma.user.upsert({
    where: { email: 'owner@pitchpro.com' },
    update: {},
    create: {
      email: 'owner@pitchpro.com',
      name: 'Court Owner',
      passwordHash,
      role: UserRole.OWNER
    }
  })

  await prisma.user.upsert({
    where: { email: 'player@pitchpro.com' },
    update: {},
    create: {
      email: 'player@pitchpro.com',
      name: 'Player User',
      passwordHash,
      role: UserRole.PLAYER
    }
  })

  const courts = [
    {
      id: 'court-1',
      name: 'Central Park Field A',
      description: 'Well-maintained grass field in the heart of the city',
      location: 'Central Park, New York',
      pricePerHour: 50,
      imageUrl: '/courts/central-park.jpg'
    },
    {
      id: 'court-2',
      name: 'Downtown Sports Complex',
      description: 'Indoor artificial turf court with lighting',
      location: 'Downtown Sports Complex, New York',
      pricePerHour: 75,
      imageUrl: '/courts/downtown-complex.jpg'
    },
    {
      id: 'court-3',
      name: 'Riverside Field',
      description: 'Scenic field by the river with great views',
      location: 'Riverside Park, New York',
      pricePerHour: 60,
      imageUrl: '/courts/riverside.jpg'
    }
  ]

  for (const court of courts) {
    await prisma.court.upsert({
      where: { id: court.id },
      update: { ...court, ownerId: owner.id },
      create: { ...court, ownerId: owner.id }
    })
  }

  console.log('Seed complete', { admin: admin.email, owner: owner.email })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
