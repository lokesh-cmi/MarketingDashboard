'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ComposedChart } from 'recharts';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useDateRange } from '@/contexts/DateRangeContext';

interface SearchConsoleData {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

interface SearchConsoleSummary {
  totalImpressions: number;
  totalClicks: number;
  avgCTR: number;
  avgPosition: number;
  dailyData: SearchConsoleData[];
}

export default function SearchConsoleOverview() {
  const { dateRange, getDateRangeInDays } = useDateRange();
  const [data, setData] = useState<SearchConsoleSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const days = getDateRangeInDays();
        console.log(`[SearchConsoleOverview] Fetching data for ${dateRange} (${days} days)`);
        
        // Add timestamp to prevent caching issues
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/search-console?days=${days}&t=${timestamp}`, {
          cache: 'no-store',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch search console data');
        }
        
        const searchData = await response.json();
        console.log(`[SearchConsoleOverview] Data source: ${searchData.source}`);
        console.log(`[SearchConsoleOverview] Data points: ${searchData.dailyData?.length || 0}`);
        
        setData(searchData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching search console data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dateRange, getDateRangeInDays]);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Search Console Overview</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading search console data...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Search Console Overview</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error: {error || 'Failed to load data'}</div>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString('en-US');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Search Console Overview</h2>
        <Link 
          href="/search-console?category=seo"
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          View More
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Impressions</div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatNumber(data.totalImpressions)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Clicks</div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatNumber(data.totalClicks)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Avg Position</div>
          <div className="text-2xl font-semibold text-gray-900">
            {data.avgPosition.toFixed(1)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">CTR</div>
          <div className="text-2xl font-semibold text-gray-900">
            {data.avgCTR.toFixed(2)}%
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={data.dailyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#999" />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 12 }} 
            stroke="#999"
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            tick={{ fontSize: 12 }} 
            stroke="#999"
            domain={[0, 'dataMax + 10']}
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              if (name === 'position') {
                return [value.toFixed(1), 'Position'];
              }
              if (name === 'ctr') {
                return [value.toFixed(2) + '%', 'CTR'];
              }
              return [formatNumber(value), name];
            }}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar yAxisId="left" dataKey="impressions" fill="#6b7280" name="Impressions" />
          <Bar yAxisId="left" dataKey="clicks" fill="#3b82f6" name="Clicks" />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="position" 
            stroke="#f59e0b" 
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Position"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
