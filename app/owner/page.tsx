import { BarChart3, CalendarRange, DollarSign, PlusCircle, Building2 } from 'lucide-react'

const ownerMenu = ['My Courts', 'Add Court', 'Bookings', 'Revenue', 'Analytics']

export default function OwnerDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-4">Owner Dashboard</h2>
          <div className="space-y-2">
            {ownerMenu.map((item) => (
              <button key={item} type="button" className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50">
                {item}
              </button>
            ))}
          </div>
        </aside>

        <section className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <Building2 className="h-5 w-5 text-green-600" />
              <p className="text-sm text-gray-500 mt-2">Total Courts</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <CalendarRange className="h-5 w-5 text-green-600" />
              <p className="text-sm text-gray-500 mt-2">Monthly Bookings</p>
              <p className="text-2xl font-bold text-gray-900">82</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <DollarSign className="h-5 w-5 text-green-600" />
              <p className="text-sm text-gray-500 mt-2">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">$6,420</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <p className="text-sm text-gray-500 mt-2">Occupancy</p>
              <p className="text-2xl font-bold text-gray-900">74%</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Court Management</h3>
              <button type="button" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700">
                <PlusCircle className="h-4 w-4" />
                Add Court
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Manage availability schedules, pricing, and booking approvals from a single owner workspace.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
