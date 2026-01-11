'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';

interface DetailedAnalytics {
  summary: {
    totalSessions: number;
    totalUsers: number;
    totalPageViews: number;
    avgEngagementRate: number;
    monthlyData: any[];
  };
  popularPages: { path: string; views: number; percentage: number }[];
  trafficByCountry: { country: string; users: number; percentage: number }[];
  trafficByDevice: { device: string; sessions: number; percentage: number }[];
  trafficSources: { source: string; sessions: number; percentage: number }[];
  engagement: {
    pageviewsPerSession: number;
    avgSessionDuration: string;
    bounceRate: number;
    scrolledUsers: number;
    engagementRate: number;
  };
  dailyViews: { date: string; views: number; sessions: number }[];
}

const DEVICE_COLORS: { [key: string]: string } = {
  desktop: '#8b5cf6',
  mobile: '#c084fc',
  tablet: '#e9d5ff',
  'smart tv': '#f3e8ff',
};

export default function AnalyticsPage() {
  const [data, setData] = useState<DetailedAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/google-analytics-detailed');
        
        if (!response.ok) {
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

  const formatNumber = (num: number) => num.toLocaleString('en-US');

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500 text-lg">Loading analytics data...</div>
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

  const deviceChartData = data.trafficByDevice.map(device => ({
    name: device.device,
    value: device.sessions,
    percentage: device.percentage,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Traffic & Acquisition */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">Traffic & Acquisition</h1>
          
          <div className="grid grid-cols-2 gap-8">
            {/* Traffic Summary */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Traffic summary</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="border-2 border-purple-500 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Views</div>
                  <div className="text-2xl font-bold text-gray-900">{formatNumber(data.summary.totalPageViews)}</div>
                  <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +34.6%
                  </div>
                </div>
                <div className="border-2 border-purple-300 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Sessions</div>
                  <div className="text-2xl font-bold text-gray-900">{formatNumber(data.summary.totalSessions)}</div>
                  <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +3.1%
                  </div>
                </div>
                <div className="border-2 border-purple-200 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">Total users</div>
                  <div className="text-2xl font-bold text-gray-900">{formatNumber(data.summary.totalUsers)}</div>
                  <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +23.4%
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data.dailyViews}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }} 
                    stroke="#999"
                    tickFormatter={(value) => {
                      const date = new Date(value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
                      return `${date.getDate()} Dec ${date.getFullYear()}`;
                    }}
                  />
                  <YAxis tick={{ fontSize: 10 }} stroke="#999" />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2} name="Views" />
                  <Line type="monotone" dataKey="sessions" stroke="#c084fc" strokeWidth={2} name="Sessions" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Most Popular Pages */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Most popular pages</h2>
              
              <div className="overflow-auto max-h-[350px]">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white">
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 font-semibold text-gray-700 text-xs">Top pages</th>
                      <th className="text-left py-2 px-2 font-semibold text-gray-700 text-xs">Link</th>
                      <th className="text-right py-2 px-2 font-semibold text-gray-700 text-xs">Views ▼</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.popularPages.map((page, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-purple-50">
                        <td className="py-2 px-2 text-gray-900 text-xs">{index + 1}.</td>
                        <td className="py-2 px-2 text-blue-600 text-xs truncate max-w-xs">{page.path}</td>
                        <td className="py-2 px-2 text-gray-900 text-right text-xs font-medium">{formatNumber(page.views)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-300 font-semibold">
                      <td colSpan={2} className="py-2 px-2 text-gray-900 text-xs">Grand total</td>
                      <td className="py-2 px-2 text-gray-900 text-right text-xs">{formatNumber(data.summary.totalPageViews)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Traffic Details */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            {/* Traffic per Country */}
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-4">Traffic per country</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-xs font-semibold text-gray-700">Country</th>
                    <th className="text-right py-2 text-xs font-semibold text-gray-700">Users ▼</th>
                    <th className="text-right py-2 text-xs font-semibold text-gray-700">% of all</th>
                  </tr>
                </thead>
                <tbody>
                  {data.trafficByCountry.slice(0, 10).map((country, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 text-xs text-gray-900">{index + 1}. {country.country}</td>
                      <td className="py-2 text-xs text-gray-900 text-right">{formatNumber(country.users)}</td>
                      <td className="py-2 text-xs text-gray-900 text-right">{country.percentage.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300 font-semibold">
                    <td className="py-2 text-xs text-gray-900">Grand total</td>
                    <td className="py-2 text-xs text-gray-900 text-right">{formatNumber(data.summary.totalUsers)}</td>
                    <td className="py-2 text-xs text-gray-900 text-right">100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Traffic per Device */}
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-4">Traffic per device</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={deviceChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {deviceChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={DEVICE_COLORS[entry.name.toLowerCase()] || '#8b5cf6'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatNumber(value)} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry: any) => `${value} (${entry.payload.percentage.toFixed(1)}%)`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Traffic Source */}
            <div>
              <h3 className="text-md font-semibold text-gray-900 mb-4">Traffic source</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-xs font-semibold text-gray-700">Source</th>
                    <th className="text-right py-2 text-xs font-semibold text-gray-700">Sessions ▼</th>
                    <th className="text-right py-2 text-xs font-semibold text-gray-700">% of all</th>
                  </tr>
                </thead>
                <tbody>
                  {data.trafficSources.slice(0, 10).map((source, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 text-xs text-gray-900">{index + 1}. {source.source}</td>
                      <td className="py-2 text-xs text-gray-900 text-right">{formatNumber(source.sessions)}</td>
                      <td className="py-2 text-xs text-gray-900 text-right">{source.percentage.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300 font-semibold">
                    <td className="py-2 text-xs text-gray-900">Grand total</td>
                    <td className="py-2 text-xs text-gray-900 text-right">{formatNumber(data.summary.totalSessions)}</td>
                    <td className="py-2 text-xs text-gray-900 text-right">100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Engagement */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Engagement</h2>
          
          <div className="grid grid-cols-5 gap-4">
            <div className="border-2 border-purple-500 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-500 mb-2">Pageviews per session</div>
              <div className="text-3xl font-bold text-gray-900">{data.engagement.pageviewsPerSession.toFixed(2)}</div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3" />
                +6.1%
              </div>
            </div>
            <div className="border-2 border-purple-400 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-500 mb-2">Avg session duration</div>
              <div className="text-3xl font-bold text-gray-900">00:{data.engagement.avgSessionDuration}</div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3" />
                +24.9%
              </div>
            </div>
            <div className="border-2 border-purple-300 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-500 mb-2">Bounce rate</div>
              <div className="text-3xl font-bold text-gray-900">{data.engagement.bounceRate.toFixed(2)}%</div>
              <div className="text-xs text-red-600 flex items-center justify-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3" />
                -19.8%
              </div>
            </div>
            <div className="border-2 border-purple-200 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-500 mb-2">Scrolled users</div>
              <div className="text-3xl font-bold text-gray-900">{formatNumber(data.engagement.scrolledUsers)}</div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3" />
                +19.2%
              </div>
            </div>
            <div className="border-2 border-purple-100 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-500 mb-2">Engagement rate</div>
              <div className="text-3xl font-bold text-gray-900">{data.engagement.engagementRate.toFixed(2)}%</div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3" />
                +6.7%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
