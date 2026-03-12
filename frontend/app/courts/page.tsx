"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Star, Clock, Users, Search, Building, Home, TreePine, Crown } from "lucide-react";

// Mock data for courts in Addis Ababa
const courts = [
  {
    id: 1,
    name: "Addis Ababa Stadium",
    location: "Bole Medhanealem",
    price: 200,
    rating: 4.8,
    description: "Addis Ababa&apos;s premier stadium with excellent facilities, floodlights, and changing rooms for professional matches.",
    image: "/court1.jpg",
    features: ["Floodlights", "Changing Rooms", "Parking"],
    availableSlots: 12,
    icon: Crown
  },
  {
    id: 2,
    name: "Kazanchis Football Court",
    location: "Kazanchis Area",
    price: 150,
    rating: 4.9,
    description: "Natural setting football court in Kazanchis area, ideal for casual games and training sessions.",
    image: "/court2.jpg",
    features: ["Natural Setting", "Casual Atmosphere", "Equipment Storage", "Nearby Parking"],
    availableSlots: 8,
    icon: TreePine
  },
  {
    id: 3,
    name: "Piazza Sports Center",
    location: "Piazza Area",
    price: 120,
    rating: 4.6,
    description: "Sports center in Piazza with facilities for casual games and youth training programs.",
    image: "/court3.jpg",
    features: ["Casual Atmosphere", "Equipment Storage", "Youth Friendly", "Nearby Parking"],
    availableSlots: 6,
    icon: Building
  },
  {
    id: 4,
    name: "Kolfe Indoor Court",
    location: "Kolfe Area",
    price: 180,
    rating: 4.7,
    description: "Indoor football court in Kolfe area with temperature control and professional equipment.",
    image: "/court4.jpg",
    features: ["Indoor Facility", "Temperature Control", "Professional Equipment", "Changing Rooms"],
    availableSlots: 10,
    icon: Home
  },
  {
    id: 5,
    name: "Mekanisaalem Community Field",
    location: "Mekanisaalem Area",
    price: 100,
    rating: 4.4,
    description: "Community football field in Mekanisaalem area suitable for casual games and youth training programs.",
    image: "/court5.jpg",
    features: ["Community Access", "Youth Friendly", "Basic Equipment", "Affordable Pricing"],
    availableSlots: 4,
    icon: Users
  },
  {
    id: 6,
    name: "Ayat Sports Club",
    location: "Ayat Area",
    price: 250,
    rating: 5.0,
    description: "Premium sports club in Ayat area with football courts, sports equipment, and professional services.",
    image: "/court6.jpg",
    features: ["Football Courts", "Sports Equipment", "Professional Services", "Full Service"],
    availableSlots: 15,
    icon: Crown
  }
];

export default function CourtsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourts = courts.filter(court =>
    court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    court.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
              Addis Ababa Courts
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover premium football facilities across Addis Ababa. Book instantly and enjoy professional-grade courts.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search courts..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white bg-gray-50 transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>
            <select className="px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white bg-gray-50 transition-all duration-200 text-gray-900">
              <option>All Areas</option>
              <option>Bole</option>
              <option>Piazza</option>
              <option>Kazanchis</option>
              <option>Kolfe</option>
              <option>Mekanisaalem</option>
              <option>Ayat</option>
            </select>
            <select className="px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white bg-gray-50 transition-all duration-200 text-gray-900">
              <option>Price Range</option>
              <option>0 - 150 Birr</option>
              <option>150 - 200 Birr</option>
              <option>200 Birr+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courts Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourts.map((court, index) => {
            const IconComponent = court.icon;
            return (
              <div key={court.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                {/* Image */}
                <div className="relative h-56 bg-gradient-to-br from-green-100 to-yellow-100 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-yellow-500/20"></div>
                  <IconComponent className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 text-green-600 float-animation" size={80} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 bounce-in">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm font-semibold">{court.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{court.name}</h2>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin size={16} className="mr-1" />
                        <span className="text-sm">{court.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      <span className="font-bold">{court.price}</span>
                      <span className="text-sm ml-1">ETB/hour</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{court.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {court.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
                        {feature}
                      </span>
                    ))}
                    {court.features.length > 2 && (
                      <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-md text-xs font-medium">
                        +{court.features.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{court.availableSlots} slots available</span>
                    </div>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      <span>Booked</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/courts/${court.id}`}
                    className="w-full bg-gradient-to-r from-green-600 to-yellow-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                  >
                    View Details
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-white border-2 border-green-600 text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-200">
            Load More Courts
          </button>
        </div>
      </div>
    </div>
  );
}
