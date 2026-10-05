'use client';

import { useAppState } from "@/lib/store";
import { useState } from "react";

export default function Transfers() {
  const { state } = useAppState();
  const [activeTab, setActiveTab] = useState('All');

  // Filter transfers based on tab
  const filteredTransfers = state.transfers.filter(transfer =>
    activeTab === 'All' || transfer.status === activeTab
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">Transfers</h2>
        <p className="text-gray-600">
          Manage and track inventory transfers between merchants.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab('All')}
          className={`px-4 py-2 border rounded-md text-sm ${activeTab === 'All' ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('PROPOSED')}
          className={`px-4 py-2 border rounded-md text-sm ${activeTab === 'PROPOSED' ? 'bg-orange-100 text-orange-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Proposed
        </button>
        <button
          onClick={() => setActiveTab('ACCEPTED')}
          className={`px-4 py-2 border rounded-md text-sm ${activeTab === 'ACCEPTED' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Accepted
        </button>
        <button
          onClick={() => setActiveTab('IN_TRANSIT')}
          className={`px-4 py-2 border rounded-md text-sm ${activeTab === 'IN_TRANSIT' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          In Transit
        </button>
        <button
          onClick={() => setActiveTab('COMPLETED')}
          className={`px-4 py-2 border rounded-md text-sm ${activeTab === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Completed
        </button>
      </div>

      {/* Transfer Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transfer ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                From
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                To
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distance
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estimated Benefit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransfers.map((transfer) => (
              <tr key={transfer.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => {
                // In a real app, this would open a detail view
                alert(`Viewing details for transfer ${transfer.id}`);
              }}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{transfer.id}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{transfer.product}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{transfer.quantity.toString()}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{transfer.from}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{transfer.to}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{transfer.distance.toFixed(1)} km</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${transfer.status === 'PROPOSED' ? 'bg-orange-100 text-orange-800' :
                      transfer.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-800' :
                      transfer.status === 'IN_TRANSIT' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'}`}>
                    {transfer.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right">{transfer.estimatedBenefit.toLocaleString()}</td>
              </tr>
            ))}
            {filteredTransfers.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                  No transfers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}