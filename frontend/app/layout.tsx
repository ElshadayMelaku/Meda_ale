import Link from "next/link";
import { Home, MapPin, LogIn, Trophy, Info, Phone } from "lucide-react";
import "./globals.css";

export const metadata = {
  title: "Meda Ale - Addis Ababa Football Court Booking",
  description: "Book football courts in Addis Ababa with ease. Professional facilities, instant booking, Ethiopian experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="am">
      <body className="animated-bg min-h-screen">
        <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 fade-in-up">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center py-4">
              <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 lg:gap-8">
                <Link href="/" className="flex items-center space-x-2 text-xl md:text-2xl font-bold text-green-600 hover:text-green-700 transition-colors mb-2 md:mb-0">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-green-500 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Trophy className="text-white" size={16} />
                  </div>
                  <span>Meda Ale</span>
                </Link>

                <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                  <Link href="/" className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 text-sm md:text-base">
                    <Home size={16} />
                    <span className="hidden sm:inline">Home</span>
                  </Link>
                  <Link href="/courts" className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 text-sm md:text-base">
                    <MapPin size={16} />
                    <span className="hidden sm:inline">Courts</span>
                  </Link>
                  <Link href="/about" className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 text-sm md:text-base">
                    <Info size={16} />
                    <span className="hidden sm:inline">About</span>
                  </Link>
                  <Link href="/contact" className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 text-sm md:text-base">
                    <Phone size={16} />
                    <span className="hidden sm:inline">Contact</span>
                  </Link>
                  <Link href="/login" className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-200 text-sm md:text-base">
                    <LogIn size={16} />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {children}

        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Trophy className="text-white" size={20} />
                  </div>
                  <span className="text-xl font-bold">Meda Ale</span>
                </div>
                <p className="text-gray-400">Book football courts in Addis Ababa with ease.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/courts" className="hover:text-white transition-colors">Browse Courts</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                  {/* Dashboard removed. */}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                    📘
                  </div>
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                    🐦
                  </div>
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                    📷
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Meda Ale - Addis Ababa Football Court Booking System. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
