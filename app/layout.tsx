import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { Navbar } from '@/components/layout/Navbar'
import { AuthSessionProvider } from '@/components/providers/AuthSessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "PitchPro - Football Court Booking",
  description: "Book football courts and manage your teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSessionProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
