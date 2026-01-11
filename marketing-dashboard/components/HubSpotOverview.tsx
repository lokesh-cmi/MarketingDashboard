'use client';

import React from 'react';

export default function HubSpotOverview() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">HubSpot Overview</h2>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Contacts</div>
          <div className="text-2xl font-semibold text-gray-900">12,450</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Deals</div>
          <div className="text-2xl font-semibold text-gray-900">342</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Email Campaigns</div>
          <div className="text-2xl font-semibold text-gray-900">28</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Conversion Rate</div>
          <div className="text-2xl font-semibold text-gray-900">4.2%</div>
        </div>
      </div>

      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <p className="text-gray-500">HubSpot integration coming soon...</p>
      </div>
    </div>
  );
}
