'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface AnalyticsData {
  month: string;
  sessions: number;
  users: number;
  pageViews: number;
  engagementRate: number;
}

interface AnalyticsSummary {
  totalSessions: number;
  totalUsers: number;
  totalPageViews: number;
  avgEngagementRate: number;
  monthlyData: AnalyticsData[];
}

export default function GoogleAnalyticsOverview() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/google-analytics');
        
        if (!response.ok) {
          console.log('Failed to fetch analytics data', response);
          throw new Error('Failed to fetch analytics data');
        }
        
        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Google Analytics Overview</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading analytics data...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Google Analytics Overview</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error: {error || 'Failed to load data'}</div>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => num.toLocaleString('en-US');

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Google Analytics Overview</h2>
        <Link 
          href="/analytics"
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          View More
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">Sessions</div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatNumber(data.totalSessions)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Users</div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatNumber(data.totalUsers)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Page Views</div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatNumber(data.totalPageViews)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Engagement Rate</div>
          <div className="text-2xl font-semibold text-gray-900">
            {data.avgEngagementRate.toFixed(1)}%
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data.monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#999" />
          <YAxis tick={{ fontSize: 12 }} stroke="#999" />
          <Tooltip 
            formatter={(value: number | undefined) => value ? formatNumber(value) : '0'}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <Line 
            type="monotone" 
            dataKey="sessions" 
            stroke="#3b82f6" 
            strokeWidth={2} 
            dot={{ r: 4 }} 
            name="Sessions"
          />
          <Line 
            type="monotone" 
            dataKey="users" 
            stroke="#10b981" 
            strokeWidth={2} 
            dot={{ r: 4 }} 
            name="Users"
          />
          <Line 
            type="monotone" 
            dataKey="pageViews" 
            stroke="#f59e0b" 
            strokeWidth={2} 
            dot={{ r: 4 }} 
            name="Page Views"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
