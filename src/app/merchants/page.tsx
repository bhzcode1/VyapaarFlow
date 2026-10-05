'use client';

import { useAppState } from "@/lib/store";
import { useState } from "react";

export default function Merchants() {
  const { state } = useAppState();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  // Filter merchants based on search and filter
  const filteredMerchants = state.merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(search.toLowerCase());
    const hasNeeds = filter === 'Needs Stock' && merchant.needs.length > 0;
    const hasExcess = filter === 'Has Surplus' && merchant.excess.length > 0;
    const isNearby = filter === 'Nearby' && merchant.distance <= 2.0;
    const matchesFilter = filter === 'All' || hasNeeds || hasExcess || isNearby;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Merchant Network</h2>
        <p className="text-gray-600">
          Discover nearby merchants with complementary inventory needs.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <input
            type="text"
            placeholder="Search merchants..."
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
              onClick={() => setFilter('Needs Stock')}
              className={`px-3 py-1 border rounded-md text-sm ${filter === 'Needs Stock' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700'}`}
            >
              Needs Stock
            </button>
            <button
              onClick={() => setFilter('Has Surplus')}
              className={`px-3 py-1 border rounded-md text-sm ${filter === 'Has Surplus' ? 'bg-orange-100 text-orange-800' : 'bg-gray-200 text-gray-700'}`}
            >
              Has Surplex
            </button>
            <button
              onClick={() => setFilter('Nearby')}
              className={`px-3 py-1 border rounded-md text-sm ${filter === 'Nearby' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}
            >
              Nearby
            </button>
          </div>
        </div>
      </div>

      {/* Merchant Cards */}
      <div className="space-y-4">
        {filteredMerchants.map((merchant) => (
          <div key={merchant.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
            // In a real app, this would open a detail view
            alert(`Viewing details for ${merchant.name}`);
          }}>
            <div className="border-b border-gray-200">
              <div className="flex items-start justify-between p-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-sm font-medium">
                    SS
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">{merchant.name}</p>
                    <p className="text-xs text-gray-500">{merchant.distance.toFixed(1)} km</p>
                  </div>
                </div>
                <div className="text-xs">
                  <span className={`px-2 py-0.5 rounded
                    ${merchant.status === 'Demand' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'}`}>
                    {merchant.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {merchant.needs.map((need, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mt-1"></div>
                  <div>
                    <p className="text-sm text-gray-700">Needs: {need.quantity} {need.product}</p>
                  </div>
                </div>
              ))}
              {merchant.excess.map((excess, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="h-2 w-2 bg-orange-500 rounded-full mt-1"></div>
                  <div>
                    <p className="text-sm text-gray-700">Excess: {excess.quantity} {excess.product}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button className="w-full px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/80 rounded-md">
                {merchant.status === 'Demand' ? 'Send Transfer' : 'Request Stock'}
              </button>
            </div>
          </div>
        ))}
        {filteredMerchants.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No matching merchants found.</p>
          </div>
        )}
      </div>
    </div>
  );
}