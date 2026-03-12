import { MapPin, Phone, Mail, Clock, Send, MessageCircle, HeadphonesIcon, Calendar, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function ContactPage() {
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
              <MessageCircle className="text-yellow-300" size={32} />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Have questions about booking courts or need assistance? We&apos;re here to help you enjoy the best football experience in Addis Ababa.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple ways to reach us. Choose the method that works best for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-yellow-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Phone className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Phone</h3>
              <p className="text-gray-600 mb-2">+251 911 123 456</p>
              <p className="text-gray-600 mb-2">+251 922 789 012</p>
              <p className="text-sm text-gray-500">Mon-Fri: 8AM-8PM</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Email</h3>
              <p className="text-gray-600 mb-2">info@medaale.et</p>
              <p className="text-gray-600 mb-2">support@medaale.et</p>
              <p className="text-sm text-gray-500">24/7 Response</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Office</h3>
              <p className="text-gray-600 mb-2">Bole Medhanealem</p>
              <p className="text-gray-600 mb-2">Addis Ababa, Ethiopia</p>
              <p className="text-sm text-gray-500">Near Bole International Airport</p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Hours</h3>
              <p className="text-gray-600 mb-2">Monday - Friday</p>
              <p className="text-gray-600 mb-2">8:00 AM - 8:00 PM</p>
              <p className="text-sm text-gray-500">Weekend: 9AM-6PM</p>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h3>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white bg-gray-50 transition-all duration-200 text-gray-900 placeholder-gray-500"
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white bg-gray-50 transition-all duration-200 text-gray-900 placeholder-gray-500"
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white bg-gray-50 transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white bg-gray-50 transition-all duration-200 text-gray-900"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white bg-gray-50 transition-all duration-200 resize-none text-gray-900 placeholder-gray-500"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-yellow-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-700 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-2xl h-80 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={48} className="mx-auto mb-4" />
                  <p className="text-lg font-semibold">Interactive Map</p>
                  <p>Find us in Bole, Addis Ababa</p>
                </div>
              </div>

              {/* Quick Help */}
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <HeadphonesIcon className="text-green-600" size={24} />
                  Quick Help
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-green-600 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Booking Issues</h4>
                      <p className="text-gray-600 text-sm">Having trouble booking a court? Call us immediately.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="text-yellow-600 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900">General Inquiries</h4>
                      <p className="text-gray-600 text-sm">Questions about our services or facilities.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="text-red-600 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Partnerships</h4>
                      <p className="text-gray-600 text-sm">Interested in partnering with Meda Ale?</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
                <p className="text-gray-600 mb-6">Stay updated with the latest news and court availability.</p>

                <div className="flex justify-center space-x-6">
                  <a href="https://www.facebook.com/medaale" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-200 transform hover:scale-110">
                    <Facebook className="text-white" size={20} />
                  </a>
                  <a href="https://www.instagram.com/medaale" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-110">
                    <Instagram className="text-white" size={20} />
                  </a>
                  <a href="https://www.twitter.com/medaale" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-200 transform hover:scale-110">
                    <Twitter className="text-white" size={20} />
                  </a>
                  <a href="https://www.youtube.com/@medaale" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-200 transform hover:scale-110">
                    <Youtube className="text-white" size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about Meda Ale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How do I book a court?</h3>
              <p className="text-gray-600">Simply browse available courts, select your preferred time slot, and complete the booking process. You&apos;ll receive instant confirmation.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I cancel my booking?</h3>
              <p className="text-gray-600">Yes, you can cancel up to 2 hours before your booking time. Contact us immediately if you need to cancel.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Are the courts available 24/7?</h3>
              <p className="text-gray-600">Most courts are available from 6 AM to 10 PM. Premium facilities may have extended hours. Check individual court details.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Do you accept payments in Birr?</h3>
              <p className="text-gray-600">Yes, all payments are processed in Ethiopian Birr (ETB). We accept mobile money, bank transfers, and cash payments.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}