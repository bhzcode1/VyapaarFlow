import { 
  Home, 
  Package, 
  BarChart3, 
  Users, 
  ArrowLeftRight, 
  Bot, 
  FileText,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: Home, href: '/' },
  { label: 'Inventory', icon: Package, href: '/inventory' },
  { label: 'Sales', icon: BarChart3, href: '/sales' },
  { label: 'Opportunities', icon: Users, href: '/opportunities' },
  { label: 'Merchant Network', icon: ArrowLeftRight, href: '/merchants' },
  { label: 'Transfers', icon: Bot, href: '/transfers' },
  { label: 'AI Copilot', icon: FileText, href: '/copilot' },
  { label: 'Reports', icon: FileText, href: '/reports' },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r border-gray-200 flex-shrink-0">
      <div className="flex items-center px-4 py-6">
        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
          VF
        </div>
        <span className="ml-3 font-semibold text-xl text-gray-800">VyapaarFlow</span>
      </div>
      <nav className="mt-6 space-y-1 px-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`
              flex items-center px-3 py-2 rounded-md text-sm font-medium
              hover:bg-gray-50 hover:text-gray-900
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              transition-colors
            `}
          >
            <item.icon className="h-4 w-4 mr-3 text-gray-500 group-hover:text-gray-900" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="mt-auto px-4 pb-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold text-sm">
            SS
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-gray-800">Sharma Stores</p>
            <p className="text-sm text-gray-500">Bengaluru</p>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </aside>
  );
}
