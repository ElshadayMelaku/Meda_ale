import Link from "next/link";
import { Search, Calendar, CheckCircle, Play, Clock, MapPin, Trophy, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-yellow-600 to-red-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl float-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl float-animation" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-300/20 rounded-full blur-xl float-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 bg-green-300/20 rounded-full blur-xl float-animation" style={{animationDelay: '2s'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8 fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 float-animation">
              <Trophy className="text-yellow-300" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent bounce-in">
              Meda Ale
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100 mb-8 max-w-3xl mx-auto leading-relaxed fade-in-up" style={{animationDelay: '0.2s'}}>
              Find and reserve the best football courts in Addis Ababa. Professional facilities, instant booking, unbeatable Ethiopian experience.
            </p>
            <p className="text-lg text-green-100 mb-8 fade-in-up" style={{animationDelay: '0.4s'}}>
              Find and reserve the best football courts in Addis Ababa. Professional facilities, instant booking, unbeatable Ethiopian experience.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up" style={{animationDelay: '0.6s'}}>
            <Link
              href="/courts"
              className="group bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-50 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl bounce-in"
            >
              <span className="flex items-center gap-2">
                <Search size={20} />
                Browse Courts
              </span>
            </Link>
            <Link
              href="/register"
              className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transform hover:scale-105 transition-all duration-200 bounce-in"
              style={{animationDelay: '0.1s'}}
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Meda Ale?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience Ethiopia&apos;s premier football court booking platform with facilities across Addis Ababa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-yellow-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 fade-in-up">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 float-animation">
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Booking</h3>
              <p className="text-gray-600">Book Addis Ababa courts in seconds with instant confirmation.</p>
              <p className="text-gray-500 text-sm mt-2">Book Addis Ababa courts in seconds with instant confirmation.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 float-animation" style={{animationDelay: '1s'}}>
                <MapPin className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">All Addis Ababa Areas</h3>
              <p className="text-gray-600">Access premium courts across all Addis Ababa districts.</p>
              <p className="text-gray-500 text-sm mt-2">Access premium courts across all Addis Ababa districts.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 float-animation" style={{animationDelay: '2s'}}>
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ethiopian Standard Courts</h3>
              <p className="text-gray-600">Ethiopian-standard courts with professional maintenance.</p>
              <p className="text-gray-500 text-sm mt-2">Ethiopian-standard courts with professional maintenance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Four simple steps to book your Addis Ababa court</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <Search className="text-white" size={32} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Browse Courts</h3>
              <p className="text-gray-600">Explore available football courts in Addis Ababa with detailed information and photos</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <Calendar className="text-white" size={32} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Check Availability</h3>
              <p className="text-gray-600">View real-time availability and select your preferred time slot</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <CheckCircle className="text-white" size={32} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Book & Pay</h3>
              <p className="text-gray-600">Secure your reservation with instant confirmation and payment in Birr</p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <Play className="text-white" size={32} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Play & Enjoy</h3>
              <p className="text-gray-600">Show up and enjoy your football match on a premium Addis Ababa court</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-yellow-100">Addis Courts</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">5K+</div>
              <div className="text-yellow-100">Ethiopian Players</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-yellow-100">Booking Available</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-yellow-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-red-900 via-green-900 to-yellow-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Score Big?</h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Join thousands of Ethiopian players who trust Meda Ale for their football court bookings. Start your journey today!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/courts"
              className="bg-white text-red-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-yellow-50 transform hover:scale-105 transition-all duration-200 shadow-2xl"
            >
              Browse Courts
            </Link>
            <Link
              href="/register"
              className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-red-900 transform hover:scale-105 transition-all duration-200"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
