'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { campaign: 'Campaign A', spend: 12000, leads: 450 },
  { campaign: 'Campaign B', spend: 16000, leads: 520 },
  { campaign: 'Campaign C', spend: 8500, leads: 380 },
  { campaign: 'Campaign D', spend: 6300, leads: 420 },
];

export default function CampaignOverview() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Campaign Overview</h2>
      
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Total Campaigns</div>
          <div className="text-2xl font-semibold text-gray-900">12</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Total Spend</div>
          <div className="text-2xl font-semibold text-gray-900">$42.8K</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Total Leads</div>
          <div className="text-2xl font-semibold text-gray-900">2,900</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Avg CPL</div>
          <div className="text-2xl font-semibold text-gray-900">$14.76</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="campaign" tick={{ fontSize: 12 }} stroke="#999" />
          <YAxis tick={{ fontSize: 12 }} stroke="#999" />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="spend" fill="#a855f7" />
          <Bar dataKey="leads" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
