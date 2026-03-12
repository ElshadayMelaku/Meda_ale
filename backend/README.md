# PitchPro - Football Court Booking Website

A modern, full-featured football court booking platform built with Next.js 15, TypeScript, and Prisma.

## Features

- 🏟️ **Court Management**: Browse and book available football courts
- 👥 **Team Management**: Create teams, invite players, manage memberships
- 📅 **Booking System**: Easy court reservation with time slot selection
- 🔐 **Authentication**: Secure user registration and login
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Real-time Updates**: Instant booking confirmations and notifications

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pitch-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**

   Create a PostgreSQL database and update the connection string in `.env`:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/pitchpro?schema=public"
   ```

4. **Run database migrations**
   ```bash
   npm run db:push
   ```

5. **Seed the database with sample data**
   ```bash
   npm run db:seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Sample Accounts

After seeding, you can use these accounts to test the application:

- **Admin Account**: `admin@pitchpro.com` / `admin123`
- **User Account**: `user@pitchpro.com` / `user123`

## Project Structure

```
pitch-pro/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── booking/           # Booking page
│   ├── courts/            # Courts listing page
│   ├── teams/             # Teams management (to be implemented)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── courts/           # Court-related components
│   ├── layout/           # Layout components
│   ├── providers/        # Context providers
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
├── prisma/               # Database schema and seeds
│   ├── schema.prisma     # Database schema
│   └── seed.ts          # Database seeding script
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data

## Database Schema

The application uses the following main entities:

- **Users**: Authentication and user management
- **Courts**: Football court information and availability
- **Bookings**: Court reservations with time slots
- **Teams**: Team management and membership
- **TeamMembers**: Team membership relationships

## API Routes

- `GET/POST /api/courts` - Court management
- `GET/POST /api/bookings` - Booking operations
- `GET/POST /api/teams` - Team management
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.