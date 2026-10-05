'use client';

import { useAppState } from "@/lib/store";
import { useState } from "react";

export default function Opportunities() {
  const { state } = useAppState();
  const [activeTab, setActiveTab] = useState('All');

  // Filter opportunities based on tab
  const filteredOpportunities = state.opportunities.filter(opp =>
    activeTab === 'All' || opp.action === activeTab
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">AI Opportunities</h2>
        <p className="text-gray-600">
          Actions recommended by VyapaarFlow based on inventory, demand and merchant network signals.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab('All')}
          className={`px-4 py-2 border rounded-md text-sm ${activeTab === 'All' ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('BUY')}
          className={`px-4 py-2 border rounded-md text-sm ${activeTab === 'BUY' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          BUY
        </button>
        <button
          onClick={() => setActiveTab('TRANSFER')}
          className={`px-4 py-2 border rounded-md text-sm ${activeTab === 'TRANSFER' ? 'bg-orange-100 text-orange-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          TRANSFER
        </button>
        <button
          onClick={() => setActiveTab('PROMOTE')}
          className={`px-4 py-2 border rounded-md text-sm ${activeTab === 'PROMOTE' ? 'bg-purple-100 text-purple-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          PROMOTE
        </button>
        <button
          onClick={() => setActiveTab('HOLD')}
          className={`px-4 py-2 border rounded-md text-sm ${activeTab === 'HOLD' ? 'bg-gray-100 text-gray-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          HOLD
        </button>
      </div>

      {/* Opportunity Cards */}
      <div className="space-y-4">
        {filteredOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
            // In a real app, this would open a detail view
            alert(`Viewing details for ${opportunity.product} opportunity`);
          }}>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`h-8 w-8 flex items-center justify-center rounded-md
                    ${opportunity.action === 'BUY' ? 'bg-blue-100' :
                      opportunity.action === 'TRANSFER' ? 'bg-orange-100' :
                      opportunity.action === 'PROMOTE' ? 'bg-purple-100' :
                      'bg-gray-100'}`}>
                    {opportunity.action.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{opportunity.product}</p>
                  </div>
                </div>
                <div className="text-xs">
                  <span className={`px-2 py-0.5 rounded
                    ${opportunity.confidence >= 90 ? 'bg-green-100 text-green-800' :
                      opportunity.confidence >= 80 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {opportunity.confidence}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{opportunity.recommendation}</p>
              <p className="text-xs text-gray-500 mb-2">{opportunity.reason}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <span>Expected benefit:</span>
                  <span className="font-medium">₹{opportunity.expectedBenefit.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Distance:</span>
                  <span>{opportunity.distance ? opportunity.distance.toFixed(1) + ' km' : 'N/A'}</span>
                </div>
              </div>
              <div className="mt-3">
                <button className="w-full px-3 py-2 bg-primary text-primary-foreground hover:bg-primary/80 rounded-md">
                  View Opportunity
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredOpportunities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No new AI opportunities right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}