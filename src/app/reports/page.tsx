'use client';

import { useAppState } from "@/lib/store";

export default function Reports() {
  const { state } = useAppState();

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Business Reports</h2>
        <p className="text-gray-600">
          Understand how inventory decisions are affecting your business.
        </p>
      </div>

      {/* Report KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Inventory Value</h3>
          <p className="text-2xl font-bold">₹{state.reports.inventoryValue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Stockout Risk</h3>
          <p className="text-2xl font-bold text-red-600">{state.reports.stockoutRisk} products</p>
          <p className="text-xs text-gray-500">at elevated risk</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Excess Inventory</h3>
          <p className="text-2xl font-bold text-orange-600">{state.reports.excessInventory} units</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Sales Growth</h3>
          <p className="text-2xl font-bold text-green-600">+{state.reports.salesGrowth}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Gross Profit</h3>
          <p className="text-2xl font-bold">₹{state.reports.grossProfit.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Merchant Transfers</h3>
          <p className="text-2xl font-bold">{state.reports.merchantTransfers}</p>
        </div>
      </div>

      {/* Report Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Sales Growth</h3>
          {/* Placeholder for chart */}
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Sales Growth Chart (Recharts would go here)</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Inventory Health</h3>
          {/* Placeholder for chart */}
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Inventory Health Chart (Recharts would go here)</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Stockout Risk</h3>
          {/* Placeholder for chart */}
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Stockout Risk Chart (Recharts would go here)</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold mb-4">Transfer Activity</h3>
          {/* Placeholder for chart */}
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Transfer Activity Chart (Recharts would go here)</p>
          </div>
        </div>
      </div>

      {/* Business Insights */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4">AI-Generated Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="h-3 w-3 bg-blue-500 rounded-full mt-1"></div>
            <div>
              <p className="text-sm text-gray-700">
                Inventory health improved this week.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="h-3 w-3 bg-blue-500 rounded-full mt-1"></div>
            <div>
              <p className="text-sm text-gray-700">
                Two products are at elevated stockout risk.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="h-3 w-3 bg-blue-500 rounded-full mt-1"></div>
            <div>
              <p className="text-sm text-gray-700">
                Lays represents your largest current surplus.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="h-3 w-3 bg-blue-500 rounded-full mt-1"></div>
            <div>
              <p className="text-sm text-gray-700">
                Merchant-to-merchant transfers can reduce excess inventory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}