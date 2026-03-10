import Link from "next/link";
import { Users, Target, Award, Heart, MapPin, Star, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-yellow-600 to-red-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Heart className="text-yellow-300" size={32} />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
              About Meda Ale
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Ethiopia&apos;s premier football court booking platform, connecting players across Addis Ababa with world-class facilities and unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To revolutionize sports facility access in Ethiopia by providing seamless booking experiences and promoting active lifestyles across our communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-yellow-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Accessibility</h3>
              <p className="text-gray-600">Making professional football facilities accessible to everyone in Addis Ababa, from casual players to competitive teams.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600">Building stronger communities through sports, connecting players, and fostering healthy competition across Ethiopia.</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">Maintaining the highest standards in facility management and customer service, Ethiopian excellence in sports infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-600">
                <p className="text-lg leading-relaxed">
                  Meda Ale was born from a simple observation: Addis Ababa&apos;s football enthusiasts deserved better access to quality sports facilities. What started as a small initiative to connect local players with available courts has grown into Ethiopia&apos;s most trusted sports booking platform.
                </p>
                <p className="text-lg leading-relaxed">
                  We understand the passion that runs through Ethiopian football culture. From the bustling streets of Bole to the serene pitches of Entoto, we&apos;ve worked tirelessly to ensure that every player, from weekend warriors to professional athletes, can focus on what matters most - the beautiful game.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, Meda Ale serves thousands of players across Addis Ababa, providing instant access to premium facilities while supporting local sports infrastructure and promoting healthy, active lifestyles throughout our communities.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-yellow-500 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">25+</div>
                    <div className="text-green-100">Courts Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">5K+</div>
                    <div className="text-green-100">Happy Players</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">10+</div>
                    <div className="text-green-100">Districts Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">98%</div>
                    <div className="text-green-100">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Meda Ale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">We operate with complete transparency and honesty in all our dealings.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Passion</h3>
              <p className="text-gray-600">Our love for football and community drives everything we do.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality</h3>
              <p className="text-gray-600">We never compromise on the quality of our facilities or service.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">Building stronger communities through accessible sports facilities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Serving Addis Ababa</h2>
          <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto">
            From Bole to Piazza, Kazanchis to Entoto - we bring professional football facilities to every corner of Addis Ababa.
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              "Bole", "Piazza", "Kazanchis", "Entoto", "Merkato",
              "Mexico", "Shiromeda", "Ayat", "Urael", "Ledeta"
            ].map((district) => (
              <div key={district} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                <MapPin className="mx-auto mb-2" size={24} />
                <div className="font-semibold">{district}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Join the Meda Ale Community</h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Be part of Ethiopia&apos;s growing sports community. Book your court today and experience the difference that quality facilities make.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/courts"
              className="bg-white text-indigo-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transform hover:scale-105 transition-all duration-200 shadow-2xl"
            >
              Explore Courts
            </Link>
            <a
              href="/register"
              className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-900 transform hover:scale-105 transition-all duration-200"
            >
              Join Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}