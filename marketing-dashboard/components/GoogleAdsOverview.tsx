'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function GoogleAdsOverview() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalClicks: 0,
    totalCost: 0,
    totalConversions: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/google-ads');
        const result = await response.json();
        
        if (result.data) {
          setData(result.data.chartData || []);
          if (result.data.summary) {
            setSummary(result.data.summary);
          }
        }
      } catch (error) {
        console.error('Error fetching Google Ads:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const avgCPC = summary.totalClicks > 0 ? summary.totalCost / summary.totalClicks : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Google Ads Overview</h2>
        <Link 
          href="/google-ads?category=paid-campaigns"
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          View More
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Total Clicks</div>
          <div className="text-2xl font-semibold text-gray-900">{summary.totalClicks}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Avg CPC</div>
          <div className="text-2xl font-semibold text-gray-900">${avgCPC.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Total Cost</div>
          <div className="text-2xl font-semibold text-gray-900">${summary.totalCost.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Conversions</div>
          <div className="text-2xl font-semibold text-gray-900">{summary.totalConversions}</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#999" />
          <YAxis tick={{ fontSize: 12 }} stroke="#999" />
          <Tooltip />
          <Line type="monotone" dataKey="clicks" stroke="#4285F4" strokeWidth={2} dot={{ r: 4 }} name="Clicks" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
