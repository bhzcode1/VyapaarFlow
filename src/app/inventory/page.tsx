'use client';

import { useAppState } from "@/lib/store";
import { useState } from "react";

export default function Inventory() {
  const { state } = useAppState();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  // Filter inventory based on search and filter
  const filteredInventory = state.inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Inventory</h2>
        <p className="text-gray-600">
          Track stock health, forecast demand and identify inventory opportunities.
        </p>
      </div>

      {/* KPI Cards */}
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

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('All')}
              className={`px-3 py-1 border rounded-md text-sm ${filter === 'All' ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('Healthy')}
              className={`px-3 py-1 border rounded-md text-sm ${filter === 'Healthy' ? 'bg-success text-success-foreground' : 'bg-gray-200 text-gray-700'}`}
            >
              Healthy
            </button>
            <button
              onClick={() => setFilter('Low')}
              className={`px-3 py-1 border rounded-md text-sm ${filter === 'Low' ? 'bg-destructive text-destructive-foreground' : 'bg-gray-200 text-gray-700'}`}
            >
              Low
            </button>
            <button
              onClick={() => setFilter('Surplus')}
              className={`px-3 py-1 border rounded-md text-sm ${filter === 'Surplus' ? 'bg-warning text-warning-foreground' : 'bg-gray-200 text-gray-700'}`}
            >
              Surplus
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Stock
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Forecast Demand
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Safety Stock
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recommended Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredInventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => {
                // In a real app, this would open a detail view
                alert(`Viewing details for ${item.name}`);
              }}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center text-sm font-medium">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.currentStock}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {item.currentStock}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {item.forecastDemand}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {item.safetyStock}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${item.status === 'Healthy' ? 'bg-green-100 text-green-800' :
                      item.status === 'Low' ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button className={`px-3 py-1 text-xs font-medium rounded
                    ${item.recommendedAction === 'HOLD' ? 'bg-gray-200 text-gray-800' :
                      item.recommendedAction === 'BUY' ? 'bg-blue-100 text-blue-800' :
                      item.recommendedAction === 'TRANSFER' ? 'bg-orange-100 text-orange-800' :
                      'bg-purple-100 text-purple-800'}`}>
                    {item.recommendedAction}
                  </button>
                </td>
              </tr>
            ))}
            {filteredInventory.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  No products match your search and filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}