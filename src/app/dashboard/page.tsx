'use client';

import { useAppState } from "@/lib/store";
import { Package, Users, ArrowLeftRight } from "lucide-react";

export default function Dashboard() {
  const { state } = useAppState();

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">
          Overview of your inventory, sales, and merchant network.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold">{state.inventory.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Healthy Stock</h3>
          <p className="text-2xl font-bold text-green-600">
            {state.inventory.filter(i => i.status === 'Healthy').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Low Stock</h3>
          <p className="text-2xl font-bold text-red-600">
            {state.inventory.filter(i => i.status === 'Low').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500">Surplus Stock</h3>
          <p className="text-2xl font-bold text-orange-600">
            {state.inventory.filter(i => i.status === 'Surplus').length}
          </p>
        </div>
      </div>

      {/* Sales Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">Today's Sales</p>
            <p className="text-2xl font-bold">₹{state.sales.today.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">This Week</p>
            <p className="text-2xl font-bold">₹{state.sales.week.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">This Month</p>
            <p className="text-2xl font-bold">₹{state.sales.month.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Top Opportunity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Top AI Opportunity</h2>
        {state.opportunities.length > 0 ? (
          <>
            <div className="mb-4">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-md bg-orange-100">
                  T
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{state.opportunities[0].product}</p>
                  <p className="text-xs text-gray-500">{state.opportunities[0].action}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{state.opportunities[0].recommendation}</p>
              <p className="text-xs text-gray-500">{state.opportunities[0].reason}</p>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
              <div className="flex items-center space-x-2">
                <span>Expected benefit:</span>
                <span className="font-medium">₹{state.opportunities[0].expectedBenefit.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Confidence:</span>
                <span className="font-medium">{state.opportunities[0].confidence}%</span>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/80 rounded-md">
              View Opportunity
            </button>
          </>
        ) : (
          <p className="text-gray-500">No AI opportunities available.</p>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/inventory" className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-sm font-medium text-gray-700">Inventory</p>
        </a>
        <a href="/opportunities" className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow flex flex-col items-center">
          <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
            <Users className="h-6 w-6 text-orange-600" />
          </div>
          <p className="text-sm font-medium text-gray-700">Opportunities</p>
        </a>
        <a href="/merchants" className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow flex flex-col items-center">
          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
            <ArrowLeftRight className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-sm font-medium text-gray-700">Merchant Network</p>
        </a>
      </div>
    </div>
  );
}