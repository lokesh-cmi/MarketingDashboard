'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', sessions: 18000 },
  { month: 'Feb', sessions: 22000 },
  { month: 'Mar', sessions: 20000 },
  { month: 'Apr', sessions: 25000 },
  { month: 'May', sessions: 28000 },
  { month: 'Jun', sessions: 30000 },
];

export default function GoogleAnalyticsOverview() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Google Analytics Overview</h2>
      
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Sessions</div>
          <div className="text-2xl font-semibold text-gray-900">89,340</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Users</div>
          <div className="text-2xl font-semibold text-gray-900">62,180</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Page Views</div>
          <div className="text-2xl font-semibold text-gray-900">245,670</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Engagement Rate</div>
          <div className="text-2xl font-semibold text-gray-900">68.4%</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#999" />
          <YAxis tick={{ fontSize: 12 }} stroke="#999" />
          <Tooltip />
          <Line type="monotone" dataKey="sessions" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
