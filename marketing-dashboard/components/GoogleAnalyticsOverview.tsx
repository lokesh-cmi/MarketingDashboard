'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useDateRange } from '@/contexts/DateRangeContext';
import ChartTypeSwitcher, { ChartType } from './ChartTypeSwitcher';

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
  const { dateRange, getDateRangeInDays } = useDateRange();
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<ChartType>('line');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const days = getDateRangeInDays();
        console.log(`[GoogleAnalyticsOverview] Fetching data for ${dateRange} (${days} days)`);
        
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/google-analytics?days=${days}&t=${timestamp}`, {
          cache: 'no-store',
        });
        
        if (!response.ok) {
          console.log('Failed to fetch analytics data', response);
          throw new Error('Failed to fetch analytics data');
        }
        
        const analyticsData = await response.json();
        console.log(`[GoogleAnalyticsOverview] Data source: ${analyticsData.source}`);
        setData(analyticsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dateRange, getDateRangeInDays]);

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
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Google Analytics Overview</h2>
          <Link 
            href="/analytics?category=seo"
            className="flex items-center gap-1 text-xs sm:text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            View More
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-100 flex flex-col items-center justify-center text-center aspect-square">
          <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Sessions</div>
          <div className="text-lg sm:text-2xl font-semibold text-gray-900">
            {formatNumber(data.totalSessions)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-100 flex flex-col items-center justify-center text-center aspect-square">
          <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Users</div>
          <div className="text-lg sm:text-2xl font-semibold text-gray-900">
            {formatNumber(data.totalUsers)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-100 flex flex-col items-center justify-center text-center aspect-square">
          <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Page Views</div>
          <div className="text-lg sm:text-2xl font-semibold text-gray-900">
            {formatNumber(data.totalPageViews)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-100 flex flex-col items-center justify-center text-center aspect-square">
          <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Engagement Rate</div>
          <div className="text-lg sm:text-2xl font-semibold text-gray-900">
            {data.avgEngagementRate.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="relative">
        <ChartTypeSwitcher
          currentType={chartType}
          availableTypes={['line', 'bar', 'area']}
          onTypeChange={setChartType}
        />

        <ResponsiveContainer width="100%" height={200}>
          {chartType === 'bar' ? (
            <BarChart data={data.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#999" />
              <YAxis tick={{ fontSize: 12 }} stroke="#999" />
              <Tooltip 
                formatter={(value: number | undefined) => value ? formatNumber(value) : '0'}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <Bar dataKey="sessions" fill="#9333ea" name="Sessions" />
              <Bar dataKey="users" fill="#a855f7" name="Users" />
              <Bar dataKey="pageViews" fill="#c084fc" name="Page Views" />
            </BarChart>
          ) : chartType === 'area' ? (
            <AreaChart data={data.monthlyData}>
              <defs>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c084fc" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#c084fc" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#999" />
              <YAxis tick={{ fontSize: 12 }} stroke="#999" />
              <Tooltip 
                formatter={(value: number | undefined) => value ? formatNumber(value) : '0'}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <Area type="monotone" dataKey="sessions" stroke="#9333ea" fill="url(#colorSessions)" name="Sessions" />
              <Area type="monotone" dataKey="users" stroke="#a855f7" fill="url(#colorUsers)" name="Users" />
              <Area type="monotone" dataKey="pageViews" stroke="#c084fc" fill="url(#colorPageViews)" name="Page Views" />
            </AreaChart>
          ) : (
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
                stroke="#9333ea" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                name="Sessions"
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#a855f7" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                name="Users"
              />
              <Line 
                type="monotone" 
                dataKey="pageViews" 
                stroke="#c084fc" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                name="Page Views"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
