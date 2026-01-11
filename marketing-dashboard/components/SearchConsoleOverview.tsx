'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { week: 'Week 1', impressions: 45000, clicks: 3200 },
  { week: 'Week 2', impressions: 48000, clicks: 3400 },
  { week: 'Week 3', impressions: 51000, clicks: 3600 },
  { week: 'Week 4', impressions: 50000, clicks: 3500 },
];

export default function SearchConsoleOverview() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Search Console Overview</h2>
      
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Impressions</div>
          <div className="text-2xl font-semibold text-gray-900">194K</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Clicks</div>
          <div className="text-2xl font-semibold text-gray-900">14.1K</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Avg Position</div>
          <div className="text-2xl font-semibold text-gray-900">12.3</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">CTR</div>
          <div className="text-2xl font-semibold text-gray-900">7.27%</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#999" />
          <YAxis tick={{ fontSize: 12 }} stroke="#999" />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="impressions" fill="#6b7280" />
          <Bar dataKey="clicks" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
