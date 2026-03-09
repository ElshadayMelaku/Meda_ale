import './globals.css';
import RootProviders from '@/src/providers/RootProviders';
import { Geist } from "next/font/google";
import { cn } from '@/src/lib/utils';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'Meda Booking Admin',
  description: 'Admin dashboard for sports field bookings',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
