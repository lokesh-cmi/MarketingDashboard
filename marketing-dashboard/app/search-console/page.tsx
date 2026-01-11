'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ComposedChart } from 'recharts';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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

export default function SearchConsolePage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'seo';
  const [data, setData] = useState<SearchConsoleSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/search-console');
        
        if (!response.ok) {
          throw new Error('Failed to fetch search console data');
        }
        
        const searchData = await response.json();
        setData(searchData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching search console data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString('en-US');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500 text-lg">Loading search console data...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-red-500 text-lg">Error: {error || 'Failed to load data'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/?category=${category}`}
            className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Google Search Console</h1>
          <p className="text-gray-600 mt-2">Detailed search performance for the last 6 months</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">Total Impressions</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {formatNumber(data.totalImpressions)}
            </div>
            <div className="text-sm text-gray-600">Search appearances</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">Total Clicks</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {formatNumber(data.totalClicks)}
            </div>
            <div className="text-sm text-gray-600">From search results</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">Average Position</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.avgPosition.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Search ranking</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">Average CTR</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {data.avgCTR.toFixed(2)}%
            </div>
            <div className="text-sm text-gray-600">Click-through rate</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6">
          {/* Impressions and Clicks Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Impressions & Clicks Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
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
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="Position"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* CTR Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Click-Through Rate (CTR)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#999" />
                <YAxis tick={{ fontSize: 12 }} stroke="#999" />
                <Tooltip 
                  formatter={(value: number) => `${value.toFixed(2)}%`}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="ctr" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 5 }} 
                  name="CTR (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Data Table */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Month</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Impressions</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Clicks</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">CTR</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Avg Position</th>
                  </tr>
                </thead>
                <tbody>
                  {data.dailyData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{row.date}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">{formatNumber(row.impressions)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">{formatNumber(row.clicks)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">{row.ctr.toFixed(2)}%</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">{row.position.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
