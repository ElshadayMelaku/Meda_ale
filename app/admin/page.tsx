import { Ban, Building2, CreditCard, Users, ChartPie } from 'lucide-react'

const stats = [
  { label: 'Users', value: '1,204', icon: Users },
  { label: 'Courts Pending Approval', value: '18', icon: Building2 },
  { label: 'Payments Today', value: '$4,980', icon: CreditCard },
  { label: 'Platform Growth', value: '+12%', icon: ChartPie }
]

export default function AdminPanelPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-2">Manage users, courts, payments, and platform analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <Icon className="h-5 w-5 text-green-600" />
              <p className="text-sm text-gray-500 mt-2">{item.label}</p>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            </div>
          )
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Moderation Actions</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <button type="button" className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50">
            Review court submissions and approve new listings
          </button>
          <button type="button" className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 inline-flex items-center gap-2">
            <Ban className="h-4 w-4 text-red-600" />
            Ban accounts violating platform policy
          </button>
        </div>
      </div>
    </div>
  )
}
