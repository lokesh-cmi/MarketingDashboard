'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { ad: 'Ad Set 1', clicks: 4200, conversions: 180 },
  { ad: 'Ad Set 2', clicks: 3800, conversions: 165 },
  { ad: 'Ad Set 3', clicks: 4100, conversions: 175 },
];

export default function AdReportOverview() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Ad Report Overview</h2>
      
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Impressions</div>
          <div className="text-2xl font-semibold text-gray-900">333K</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Clicks</div>
          <div className="text-2xl font-semibold text-gray-900">12.1K</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Conversions</div>
          <div className="text-2xl font-semibold text-gray-900">950</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">ROAS</div>
          <div className="text-2xl font-semibold text-gray-900">3.8x</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="ad" tick={{ fontSize: 12 }} stroke="#999" />
          <YAxis tick={{ fontSize: 12 }} stroke="#999" />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="clicks" fill="#3b82f6" />
          <Bar dataKey="conversions" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
