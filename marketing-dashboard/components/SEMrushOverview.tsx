'use client';

import React from 'react';

export default function SEMrushOverview() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">SEMrush Overview</h2>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Organic Keywords</div>
          <div className="text-2xl font-semibold text-gray-900">8,234</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Organic Traffic</div>
          <div className="text-2xl font-semibold text-gray-900">45.2K</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Backlinks</div>
          <div className="text-2xl font-semibold text-gray-900">1,892</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Domain Authority</div>
          <div className="text-2xl font-semibold text-gray-900">68</div>
        </div>
      </div>

      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <p className="text-gray-500">SEMrush integration coming soon...</p>
      </div>
    </div>
  );
}
