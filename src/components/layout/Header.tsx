'use client';

import { Search, Bell } from 'lucide-react';
import { useAppState } from "@/lib/store";
import { useState } from "react";
import React from 'react';

export default function Header() {
  const { state } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Search across all data types
  const searchResults = {
    products: state.inventory.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    merchants: state.merchants.filter(merchant =>
      merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.needs.some(need => need.product.toLowerCase().includes(searchTerm.toLowerCase())) ||
      merchant.excess.some(excess => excess.product.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
    opportunities: state.opportunities.filter(opp =>
      opp.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.reason.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    transfers: state.transfers.filter(transfer =>
      transfer.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.to.toLowerCase().includes(searchTerm.toLowerCase())
    )
  };

  // Contextual notifications
  const notifications = [
    {
      id: 'n1',
      text: 'AI detected excess Lays inventory.',
      href: '/inventory',
      isRead: false
    },
    {
      id: 'n2',
      text: 'FreshMart needs 20 Maggi units.',
      href: '/opportunities',
      isRead: false
    },
    {
      id: 'n3',
      text: "Coke may stock out within 1 day.",
      href: '/inventory',
      isRead: true
    },
    {
      id: 'n4',
      text: 'Transfer TR-001 was accepted.',
      href: '/transfers',
      isRead: true
    },
    {
      id: 'n5',
      text: 'Transfer TR-002 is now in transit.',
      href: '/transfers',
      isRead: false
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSearchResults(true);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSearchResults(false);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search products, merchants, or opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`
                peer w-full pl-10 pr-4 py-2 rounded-md bg-gray-50 border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                transition-colors
              `}
            />
            {showSearchResults && searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="ml-2 h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
              >
                <Search className="h-3 w-3" />
              </button>
            )}
          </form>

          {/* Search Results Dropdown */}
          {showSearchResults && (
            <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {searchTerm ? (
                <>
                  {searchResults.products.length > 0 && (
                    <div className="px-2 py-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Products</p>
                      {searchResults.products.map(product => (
                        <div key={product.id} className="flex items-start space-x-2 px-2 py-1 hover:bg-gray-50 cursor-pointer" onClick={() => {
                          // Navigate to inventory and potentially show product details
                          // For now, just clear search
                          clearSearch();
                        }}>
                          <div className="h-3 w-3 bg-blue-500 rounded-full mt-0.5 flex-shrink-0"></div>
                          <div>
                            <p className="text-xs font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.currentStock} units / {product.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.merchants.length > 0 && (
                    <div className="px-2 py-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Merchants</p>
                      {searchResults.merchants.map(merchant => (
                        <div key={merchant.id} className="flex items-start space-x-2 px-2 py-1 hover:bg-gray-50 cursor-pointer" onClick={() => {
                          clearSearch();
                        }}>
                          <div className="h-3 w-3 bg-green-500 rounded-full mt-0.5 flex-shrink-0"></div>
                          <div>
                            <p className="text-xs font-medium text-gray-900">{merchant.name}</p>
                            <p className="text-xs text-gray-500">{merchant.distance.toFixed(1)} km</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.opportunities.length > 0 && (
                    <div className="px-2 py-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunities</p>
                      {searchResults.opportunities.map(opp => (
                        <div key={opp.id} className="flex items-start space-x-2 px-2 py-1 hover:bg-gray-50 cursor-pointer" onClick={() => {
                          clearSearch();
                        }}>
                          <div className="h-3 w-3 bg-orange-500 rounded-full mt-0.5 flex-shrink-0"></div>
                          <div>
                            <p className="text-xs font-medium text-gray-900">{opp.product}</p>
                            <p className="text-xs text-gray-500">{opp.action}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.transfers.length > 0 && (
                    <div className="px-2 py-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Transfers</p>
                      {searchResults.transfers.map(transfer => (
                        <div key={transfer.id} className="flex items-start space-x-2 px-2 py-1 hover:bg-gray-50 cursor-pointer" onClick={() => {
                          clearSearch();
                        }}>
                          <div className="h-3 w-3 bg-purple-500 rounded-full mt-0.5 flex-shrink-0"></div>
                          <div>
                            <p className="text-xs font-medium text-gray-900">{transfer.product}</p>
                            <p className="text-xs text-gray-500">{transfer.from} → {transfer.to}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {(searchResults.products.length === 0 &&
                    searchResults.merchants.length === 0 &&
                    searchResults.opportunities.length === 0 &&
                    searchResults.transfers.length === 0) && (
                    <div className="px-4 py-3 text-center text-xs text-gray-500">
                      No results found for "{searchTerm}"
                    </div>
                  )}
                </>
              ) : (
                <div className="px-4 py-3 text-center text-xs text-gray-500">
                  Start typing to search...
                </div>
              )}
            </div>
          )}
        </div>
        <div className="relative">
          <button className="relative p-2 rounded-md hover:bg-gray-100" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell className="h-5 w-5 text-gray-500" />
            {notifications.filter(n => !n.isRead).length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2 items-center justify-center bg-red-500 text-xs font-bold text-white rounded-full">
                {notifications.filter(n => !n.isRead).length}
              </span>
            )}
          </button>
        </div>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="px-4 py-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Notifications</p>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map(notification => (
                  <div key={notification.id} className={`px-4 py-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer`}
                    onClick={() => {
                      // In a real app, this would navigate to the href
                      // For now, we'll just close the dropdown
                      setShowNotifications(false);
                    }}>
                    <div className="flex items-start space-x-2">
                      <div className="h-3 w-3 flex items-center justify-center rounded-md bg-blue-100 text-blue-600 text-xs flex-shrink-0">
                        !
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{notification.text}</p>
                        {!notification.isRead && (
                          <p className="text-xs text-gray-500 mt-1">New</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <div className="px-4 py-4 text-center text-xs text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
            </div>
          )}
      </div>
      <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold text-sm">
        SS
      </div>
    </div>
  );
}