# PitchPro - System Requirements Specification (SRS)

## 1. Project Title

PitchPro - Football Court Booking and Match Management System

## 2. Objective

The platform enables players to discover courts, book slots, manage teams, track matches, and pay securely.

Court owners can register courts, manage schedules, and monitor revenue.

Admins can manage users, courts, payments, and platform analytics.

## 3. User Roles

### Player / User

- Register and sign in
- Search courts by filters
- Book time slots
- Pay online
- Create and manage teams
- Track match history

### Court Owner

- Register business and courts
- Set pricing and availability
- Accept or reject bookings
- View revenue and booking analytics

### Admin

- Manage users
- Approve courts
- Manage payments
- View system analytics
- Ban accounts

## 4. Functional Requirements

### Authentication

- Email and password sign-in
- Optional Google sign-in
- Forgot password
- Role-based access control

### Court Discovery

- Search by subcity, price range, rating, and availability
- Map view with court markers
- Court detail page with photos, description, amenities, reviews, and time slots

### Booking

- Select date and time slot
- Real-time availability
- Booking confirmation
- Booking status: Pending, Confirmed, Cancelled, Completed

### Payments

- Online payments
- Mobile money and card support
- Payment status tracking
- Refund handling flow

### Team Management

- Team creation and invite flow
- Win/loss and basic player statistics

### Match Tracking

- Match score recording
- Leaderboard and rankings

### Notifications

- Booking confirmations
- Match reminders
- Payment confirmations

## 5. Non-Functional Requirements

- Responsive design (mobile and desktop)
- Fast load target (under 3 seconds for key pages)
- Secure auth with JWT (or equivalent managed auth)
- Payment transport security with SSL/TLS
- Scalable backend architecture

## 6. UI Structure

### Landing Page

- Navbar: logo, Find Courts, Matches, Teams, Leaderboard, Sign In, Get Started
- Hero section with CTA
- Features grid
- How It Works flow
- Popular Courts cards
- Testimonials
- Footer with About, Contact, Privacy, socials

### Core Pages

- Courts list: left filters and right cards, map toggle
- Court detail: carousel/media, amenities, availability calendar and slots
- Booking page: selected court/time, pricing, payment method, confirmation
- User dashboard: bookings, teams, history, settings
- Owner dashboard: courts, bookings, revenue, analytics
- Admin panel: users, court approvals, reports, moderation

## 7. Recommended Stack

- Frontend: Next.js, Tailwind CSS, Framer Motion, shadcn/ui
- Backend: Node.js + Express or NestJS
- Database: PostgreSQL or MongoDB
- Auth: JWT / NextAuth
- Payments: Stripe and Chapa (Ethiopia)

## 8. Design Tokens

- Primary: `#16A34A`
- Accent: `#F59E0B`
- Background: light gray
- Buttons: rounded-xl

## 9. Optional WOW Features

- Live availability updates (WebSockets)
- AI court recommendations
- Booking countdown timer
- Weather integration
- Dark mode
- Progressive Web App (PWA)
