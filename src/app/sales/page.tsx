'use client';

import { useAppState } from "@/lib/store";

export default function Sales() {
  const { state } = useAppState();

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Sales Analytics</h2>
        <p className="text-gray-600">
          Monitor your sales performance and key business metrics.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Today's Sales</h3>
          <p className="text-2xl font-bold">₹{state.sales.today.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">This Week</h3>
          <p className="text-2xl font-bold">₹{state.sales.week.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">This Month</h3>
          <p className="text-2xl font-bold">₹{state.sales.month.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Gross Profit</h3>
          <p className="text-2xl font-bold text-green-600">₹{state.sales.grossProfit.toLocaleString()}</p>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4">Sales Trend</h3>
        <div className="space-x-2 mb-4">
          <button
            className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50"
          >
            7 Days
          </button>
          <button
            className="px-3 py-1 border rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/80"
          >
            30 Days
          </button>
          <button
            className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50"
          >
            90 Days
          </button>
        </div>

        {/* Placeholder for chart - in a real app this would use Recharts */}
        <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Sales Chart (Recharts would go here)</p>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4">Top Selling Products</h3>
        <div className="space-y-3">
          {["Maggi", "Coke", "Parle-G", "Lays", "Sprite"].map((product, index) => (
            <div key={product} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center text-sm font-medium">
                  {product.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{product}</p>
                  <p className="text-xs text-gray-500">Units Sold: {100 + index * 10}</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className="text-sm font-medium text-gray-900">₹{500 + index * 100}</p>
                <p className="text-xs text-green-600">+{10 + index * 2}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Insights */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4">AI Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="h-3 w-3 bg-blue-500 rounded-full mt-1"></div>
            <div>
              <p className="text-sm text-gray-700">
                Maggi sales increased 14% this week.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="h-3 w-3 bg-blue-500 rounded-full mt-1"></div>
            <div>
              <p className="text-sm text-gray-700">
                Coke demand is rising faster than current inventory.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="h-3 w-3 bg-blue-500 rounded-full mt-1"></div>
            <div>
              <p className="text-sm text-gray-700">
                Lays is showing slower sales velocity compared with last week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}