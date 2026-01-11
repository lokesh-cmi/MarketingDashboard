'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { linkedInAdsOverviewData } from '@/lib/mock-data/linkedinAdsData';

export default function LinkedInAdsOverview() {
  const totalSpend = linkedInAdsOverviewData.reduce((sum, item) => sum + item.spend, 0);
  const totalClicks = linkedInAdsOverviewData.reduce((sum, item) => sum + item.clicks, 0);
  const totalConversions = linkedInAdsOverviewData.reduce((sum, item) => sum + item.conversions, 0);
  const totalImpressions = linkedInAdsOverviewData.reduce((sum, item) => sum + item.impressions, 0);
  const avgCPC = totalSpend / totalClicks;
  const ctr = (totalClicks / totalImpressions) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">LinkedIn Ads Overview</h2>
        <Link 
          href="/linkedin-ads?category=paid-campaigns"
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
        <LineChart data={linkedInAdsOverviewData}>
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
