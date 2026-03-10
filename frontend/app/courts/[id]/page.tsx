"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MapPin, DollarSign, Star, Clock, Users, CheckCircle, ArrowLeft, Calendar, Phone, Mail, AlertTriangle, Trophy } from "lucide-react";

// Mock data for courts
const courts = [
  {
    id: 1,
    name: "Green Field Arena",
    location: "Downtown Sports Complex, 123 Main St",
    directions: "https://www.google.com/maps/search/?api=1&query=Downtown+Sports+Complex+123+Main+St",
    price: 50,
    rating: 4.8,
    description: "Professional grass field with excellent facilities. Features include floodlights, changing rooms, parking, and equipment rental. Perfect for competitive matches and training sessions.",
    images: ["/court1.jpg","/court1b.jpg","/court1c.jpg"],
    openHours: "6:00 AM - 10:00 PM",
    availableSlots: ["9:00 AM", "10:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"],
    features: ["Grass Surface", "Floodlights", "Changing Rooms", "Parking", "Equipment Rental", "Spectator Area"],
    amenities: ["Showers", "Lockers", "First Aid Kit", "Water Station"],
    reviews: 124,
    capacity: "22 players",
    surface: "Natural Grass",
    contact: {
      phone: "(555) 123-4567",
      email: "info@greenfieldarena.com"
    }
  },
  {
    id: 2,
    name: "City Stadium",
    location: "Central Park, 456 Park Ave",
    price: 75,
    rating: 4.9,
    description: "Large stadium with multiple courts available. Professional setup with premium amenities, perfect for tournaments and large group activities.",
    image: "/court2.jpg",
    availableSlots: ["8:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"],
    features: ["Multiple Courts", "Professional Setup", "Spectator Area", "Equipment Rental", "Concession Stand", "Sound System"],
    amenities: ["VIP Lounge", "Media Facilities", "Full Service Catering", "Pro Shop"],
    reviews: 89,
    capacity: "44 players",
    surface: "Artificial Turf",
    contact: {
      phone: "(555) 987-6543",
      email: "bookings@citystadium.com"
    }
  },
  {
    id: 3,
    name: "Riverside Pitch",
    location: "Riverside District, 789 River Rd",
    price: 40,
    rating: 4.6,
    description: "Scenic location with natural surroundings. Perfect for casual games and training sessions in a relaxed atmosphere.",
    image: "/court3.jpg",
    availableSlots: ["10:00 AM", "12:00 PM", "3:00 PM", "5:00 PM"],
    features: ["Natural Setting", "Casual Atmosphere", "Equipment Storage", "Nearby Parking"],
    amenities: ["Picnic Area", "BBQ Facilities", "Nature Trails", "Pet Friendly"],
    reviews: 67,
    capacity: "22 players",
    surface: "Natural Grass",
    contact: {
      phone: "(555) 456-7890",
      email: "riverside@sports.com"
    }
  }
];

interface CourtDetailPageProps {
  params: {
    id: string;
  };
}

export default function CourtDetailPage({ params }: CourtDetailPageProps) {
  const court = courts.find(c => c.id === parseInt(params.id));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [customHours, setCustomHours] = useState<number>(1);

  if (!court) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md">
            <div className="text-6xl mb-4 text-red-500">
              <AlertTriangle size={64} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Court Not Found</h1>
            <p className="text-gray-600 mb-6">The court you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link
              href="/courts"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Courts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link
            href="/courts"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft size={18} />
            Back to Courts
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {court.images && court.images.map((img, idx) => (
                  <div key={idx} className="relative w-full h-48">
                    <Image src={img} alt={`${court.name} image ${idx+1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="relative h-80 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20"></div>
                <div className="text-9xl opacity-20 text-blue-500">
                  <Trophy size={144} />
                </div>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                  <Star className="text-yellow-400 fill-current" size={18} />
                  <span className="font-bold text-gray-900">{court.rating}</span>
                  <span className="text-gray-600">({court.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Court Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{court.name}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={18} className="mr-2" />
                    <span>{court.location}</span>
                  </div>
                </div>
                <div className="flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-xl">
                  <DollarSign size={20} className="mr-2" />
                  <span className="text-3xl font-bold">{court.price}</span>
                  <span className="text-lg ml-1">/hour</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">{court.description}</p>

              {/* Key Details */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Users className="mx-auto mb-2 text-blue-600" size={24} />
                  <div className="font-semibold text-gray-900">Capacity</div>
                  <div className="text-gray-600">{court.capacity}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <CheckCircle className="mx-auto mb-2 text-green-600" size={24} />
                  <div className="font-semibold text-gray-900">Surface</div>
                  <div className="text-gray-600">{court.surface}</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Clock className="mx-auto mb-2 text-purple-600" size={24} />
                  <div className="font-semibold text-gray-900">Available Slots</div>
                  <div className="text-gray-600">{court.availableSlots.length} today</div>
                </div>
                {court.openHours && (
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <div className="font-semibold text-gray-900">Open Hours</div>
                  <div className="text-gray-600">{court.openHours}</div>
                </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Features & Amenities</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {court.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="text-green-600" size={18} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {court.amenities.map((amenity, index) => (
                    <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Available Time Slots */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Time Slots</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {court.availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-4 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
                      selectedSlot === slot ? "bg-green-600 text-white" : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                  >
                    <Clock size={16} />
                    {slot}
                  </button>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-2 text-blue-800">
                  <Calendar size={18} />
                  <span className="font-medium">Booking for today - {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book This Court</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price per hour</span>
                  <span className="font-bold text-lg">${court.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration (hrs)</span>
                  <input type="number" min={1} value={customHours} onChange={e=>setCustomHours(parseInt(e.target.value)||1)} className="w-16 border border-gray-300 rounded-lg px-2 py-1" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Select slot</span>
                  <span className="font-semibold">{selectedSlot||"None"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Method</span>
                  <select className="border border-gray-300 rounded-lg px-2 py-1">
                    <option>Pay at Venue</option>
                    <option>Mobile Money</option>
                    <option>Card</option>
                  </select>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-semibold">Total</span>
                  <span className="text-2xl font-bold text-green-600">${court.price * customHours}</span>
                </div>
              </div>

              <Link href="/login" className="w-full inline-flex justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Book Now (Login)
              </Link>
              <p className="text-sm text-gray-500 text-center mt-4">
                Don&apos;t have an account? <Link href="/register" className="text-blue-600 underline">Sign up</Link>
              </p>

              <p className="text-sm text-gray-500 text-center mt-4">
                Instant confirmation • Free cancellation up to 2 hours before
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="text-blue-600" size={18} />
                  <span className="text-gray-700">{court.contact.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-600" size={18} />
                  <span className="text-gray-700">{court.contact.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Court Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="font-semibold">{court.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-semibold">{court.reviews}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Today</span>
                  <span className="font-semibold text-green-600">{court.availableSlots.length} slots</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
