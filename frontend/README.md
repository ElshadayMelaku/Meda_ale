# Football Court Management System - Frontend

A modern, responsive Next.js web application for booking football courts online.

## 📋 Features

### For Customers
- 🏠 **Browse Courts**: View available football courts with details and amenities
- 🔍 **Search & Filter**: Filter courts by location and price
- 📅 **Book Courts**: Easy-to-use booking system with date and time slot selection
- 📊 **Dashboard**: (removed in frontend branch)
- 👤 **User Authentication**: Secure login and registration

### For Administrators
- 🏟️ **Court Management**: Add, update, and delete courts
- 📈 **Booking Management**: View all bookings and manage schedules
- 💹 **Analytics**: Track total bookings, revenue, and performance metrics
- ⚙️ **System Control**: Full administrative capabilities

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📱 Pages & Features

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with featured courts |
| Browse Courts | `/courts` | Search and filter all available courts |
| Court Details | `/courts/:id` | Detailed court info and booking form |
| Login | `/login` | User authentication |
| Register | `/register` | New user registration |
| Admin Panel | `/admin` | Administrative controls and analytics |

## 🔐 Demo Accounts

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

**Regular User:**
- Register with any email/password combination

## 📂 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx                      # Root layout
│   ├── page.tsx                        # Home page
│   ├── globals.css                     # Global styles
│   ├── courts/
│   │   ├── page.tsx                    # Courts listing
│   │   └── [id]/page.tsx               # Court details
│   ├── login/page.tsx                  # Login page
│   ├── register/page.tsx               # Registration page
├── components/
│   ├── Navbar.tsx                      # Navigation
│   ├── HeroSection.tsx                 # Hero banner
│   ├── FeaturedCourts.tsx              # Featured display
│   ├── CourtCard.tsx                   # Court card
│   ├── SearchFilter.tsx                # Search & filter
│   ├── BookingForm.tsx                 # Booking form
│   ├── BookingCard.tsx                 # Booking card
│   ├── AdminCourtManagement.tsx        # Court mgmt
│   └── AdminBookingManagement.tsx      # Booking mgmt
├── public/                             # Static assets
└── package.json                        # Dependencies
```

## 🎨 Styling

- **Tailwind CSS**: Fully responsive, mobile-first design
- **Dark Mode Ready**: Can be extended with dark mode support
- **Custom Configuration**: Tailored theme in `tailwind.config.ts`

## 🔌 Ready for Backend Integration

The frontend is structured for easy backend integration:

```typescript
// Example API endpoint structure
/api/auth/register      # User registration
/api/auth/login         # User login
/api/courts             # Get all courts
/api/courts/:id         # Get court details
/api/bookings           # Get user bookings
/api/bookings/:id       # Get booking details
```

## 🚀 Deployment

### Deploy to Vercel

```bash
vercel
```

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## ✅ MVP Features Implemented

- [x] User Registration & Login
- [x] Browse & Search Courts
- [x] View Court Details
- [x] Book Courts with Date/Time Selection
- [x] View Booking History
- [x] Admin Court Management
- [x] Admin Booking Management
- [x] Responsive Design
- [x] Search & Filter

## 🔄 Future Enhancements

- [ ] Payment Integration (Stripe/PayPal)
- [ ] Email/SMS Notifications
- [ ] Map Integration
- [ ] User Reviews & Ratings
- [ ] Real-time Updates
- [ ] Mobile App

## 🐛 Current Limitations

- Uses localStorage (no persistent backend)
- Mock data only
- No payment processing
- No email notifications

## 📞 Getting Help

Check [Next.js Documentation](https://nextjs.org/docs) for more information.

---

**Built with ❤️ using Next.js and Tailwind CSS**
