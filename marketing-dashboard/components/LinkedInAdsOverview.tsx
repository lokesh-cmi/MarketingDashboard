'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// More realistic mock data for LinkedIn Ads - showing daily performance over 30 days
const mockData = [
  { day: '1', clicks: 42, spend: 168, impressions: 3200, conversions: 8 },
  { day: '2', clicks: 38, spend: 152, impressions: 2900, conversions: 7 },
  { day: '3', clicks: 45, spend: 180, impressions: 3400, conversions: 9 },
  { day: '4', clicks: 51, spend: 204, impressions: 3800, conversions: 10 },
  { day: '5', clicks: 48, spend: 192, impressions: 3600, conversions: 9 },
  { day: '6', clicks: 35, spend: 140, impressions: 2700, conversions: 6 },
  { day: '7', clicks: 40, spend: 160, impressions: 3100, conversions: 8 },
  { day: '8', clicks: 52, spend: 208, impressions: 3900, conversions: 11 },
  { day: '9', clicks: 47, spend: 188, impressions: 3500, conversions: 9 },
  { day: '10', clicks: 44, spend: 176, impressions: 3300, conversions: 8 },
  { day: '11', clicks: 49, spend: 196, impressions: 3700, conversions: 10 },
  { day: '12', clicks: 55, spend: 220, impressions: 4100, conversions: 12 },
  { day: '13', clicks: 38, spend: 152, impressions: 2900, conversions: 7 },
  { day: '14', clicks: 42, spend: 168, impressions: 3200, conversions: 8 },
  { day: '15', clicks: 50, spend: 200, impressions: 3800, conversions: 10 },
  { day: '16', clicks: 46, spend: 184, impressions: 3500, conversions: 9 },
  { day: '17', clicks: 53, spend: 212, impressions: 4000, conversions: 11 },
  { day: '18', clicks: 48, spend: 192, impressions: 3600, conversions: 9 },
  { day: '19', clicks: 41, spend: 164, impressions: 3100, conversions: 8 },
  { day: '20', clicks: 36, spend: 144, impressions: 2800, conversions: 6 },
  { day: '21', clicks: 44, spend: 176, impressions: 3300, conversions: 8 },
  { day: '22', clicks: 49, spend: 196, impressions: 3700, conversions: 10 },
  { day: '23', clicks: 52, spend: 208, impressions: 3900, conversions: 11 },
  { day: '24', clicks: 47, spend: 188, impressions: 3500, conversions: 9 },
  { day: '25', clicks: 50, spend: 200, impressions: 3800, conversions: 10 },
  { day: '26', clicks: 45, spend: 180, impressions: 3400, conversions: 9 },
  { day: '27', clicks: 39, spend: 156, impressions: 3000, conversions: 7 },
  { day: '28', clicks: 43, spend: 172, impressions: 3200, conversions: 8 },
  { day: '29', clicks: 51, spend: 204, impressions: 3800, conversions: 10 },
  { day: '30', clicks: 54, spend: 216, impressions: 4100, conversions: 11 },
];

export default function LinkedInAdsOverview() {
  const totalSpend = mockData.reduce((sum, item) => sum + item.spend, 0);
  const totalClicks = mockData.reduce((sum, item) => sum + item.clicks, 0);
  const totalConversions = mockData.reduce((sum, item) => sum + item.conversions, 0);
  const totalImpressions = mockData.reduce((sum, item) => sum + item.impressions, 0);
  const avgCPC = totalSpend / totalClicks;
  const ctr = (totalClicks / totalImpressions) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">LinkedIn Ads Overview</h2>
        <Link 
          href="/linkedin-ads"
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          View More
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Total Spend</div>
          <div className="text-2xl font-semibold text-gray-900">${(totalSpend / 1000).toFixed(1)}K</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Avg CPC</div>
          <div className="text-2xl font-semibold text-gray-900">${avgCPC.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Total Clicks</div>
          <div className="text-2xl font-semibold text-gray-900">{totalClicks.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">CTR</div>
          <div className="text-2xl font-semibold text-gray-900">{ctr.toFixed(2)}%</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 12 }} 
            stroke="#999"
            interval={4}
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            stroke="#999"
            yAxisId="left"
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            stroke="#999"
            yAxisId="right"
            orientation="right"
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
          />
          <Line 
            type="monotone" 
            dataKey="clicks" 
            stroke="#0077B5" 
            strokeWidth={2} 
            dot={false} 
            name="Clicks"
            yAxisId="left"
          />
          <Line 
            type="monotone" 
            dataKey="conversions" 
            stroke="#00A0DC" 
            strokeWidth={2} 
            dot={false} 
            name="Conversions"
            yAxisId="right"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
