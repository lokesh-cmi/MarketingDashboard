'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useDateRange } from '@/contexts/DateRangeContext';

export default function LinkedInAdsOverview() {
  const { dateRange, getDateRangeInDays } = useDateRange();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalSpend: 0,
    totalClicks: 0,
    totalConversions: 0,
    totalImpressions: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const days = getDateRangeInDays();
        console.log(`[LinkedInAdsOverview] Fetching data for ${dateRange} (${days} days)`);
        
        // Add timestamp to prevent caching issues
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/linkedin-ads?days=${days}&t=${timestamp}`, {
          cache: 'no-store',
        });
        const result = await response.json();
        
        console.log(`[LinkedInAdsOverview] Data source: ${result.source}`);
        console.log(`[LinkedInAdsOverview] Data points: ${result.data?.chartData?.length || 0}`);
        
        if (result.data) {
          setData(result.data.chartData || []);
          if (result.data.summary) {
            setSummary({
              totalSpend: result.data.summary.totalSpend || 0,
              totalClicks: result.data.summary.totalClicks || 0,
              totalConversions: result.data.summary.totalConversions || 0,
              totalImpressions: result.data.summary.totalImpressions || 0,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching LinkedIn Ads:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dateRange, getDateRangeInDays]);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const avgCPC = summary.totalSpend / summary.totalClicks || 0;
  const ctr = summary.totalImpressions > 0 ? (summary.totalClicks / summary.totalImpressions) * 100 : 0;

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
          <div className="text-2xl font-semibold text-gray-900">${(summary.totalSpend / 1000).toFixed(1)}K</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Avg CPC</div>
          <div className="text-2xl font-semibold text-gray-900">${avgCPC.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Total Clicks</div>
          <div className="text-2xl font-semibold text-gray-900">{summary.totalClicks.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">CTR</div>
          <div className="text-2xl font-semibold text-gray-900">{ctr.toFixed(2)}%</div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
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
