'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ComposedChart, AreaChart, Area } from 'recharts';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useDateRange } from '@/contexts/DateRangeContext';
import ChartTypeSwitcher, { ChartType } from './ChartTypeSwitcher';

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
  const [chartType, setChartType] = useState<ChartType>('bar');

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
            className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            View More
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col items-center justify-center text-center aspect-square">
          <div className="text-sm text-gray-500 mb-2">Impressions</div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatNumber(data.totalImpressions)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col items-center justify-center text-center aspect-square">
          <div className="text-sm text-gray-500 mb-2">Clicks</div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatNumber(data.totalClicks)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col items-center justify-center text-center aspect-square">
          <div className="text-sm text-gray-500 mb-2">Avg Position</div>
          <div className="text-2xl font-semibold text-gray-900">
            {data.avgPosition.toFixed(1)}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col items-center justify-center text-center aspect-square">
          <div className="text-sm text-gray-500 mb-2">CTR</div>
          <div className="text-2xl font-semibold text-gray-900">
            {data.avgCTR.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="relative">
        <ChartTypeSwitcher
          currentType={chartType}
          availableTypes={['bar', 'line', 'area']}
          onTypeChange={setChartType}
        />

        <ResponsiveContainer width="100%" height={200}>
          {chartType === 'line' ? (
            <LineChart data={data.dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#999" />
              <YAxis tick={{ fontSize: 12 }} stroke="#999" />
              <Tooltip 
                formatter={(value: number | undefined, name: string | undefined) => {
                  if (!value || !name) return ['', ''];
                  return [formatNumber(value), name];
                }}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="impressions" stroke="#9333ea" strokeWidth={2} dot={{ r: 3 }} name="Impressions" />
              <Line type="monotone" dataKey="clicks" stroke="#a855f7" strokeWidth={2} dot={{ r: 3 }} name="Clicks" />
            </LineChart>
          ) : chartType === 'area' ? (
            <AreaChart data={data.dailyData}>
              <defs>
                <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#999" />
              <YAxis tick={{ fontSize: 12 }} stroke="#999" />
              <Tooltip 
                formatter={(value: number | undefined, name: string | undefined) => {
                  if (!value || !name) return ['', ''];
                  return [formatNumber(value), name];
                }}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="impressions" stroke="#9333ea" fill="url(#colorImpressions)" name="Impressions" />
              <Area type="monotone" dataKey="clicks" stroke="#a855f7" fill="url(#colorClicks)" name="Clicks" />
            </AreaChart>
          ) : (
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
                formatter={(value: number | undefined, name: string | undefined) => {
                  if (!value || !name) return ['', ''];
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
              <Bar yAxisId="left" dataKey="impressions" fill="#9333ea" name="Impressions" />
              <Bar yAxisId="left" dataKey="clicks" fill="#a855f7" name="Clicks" />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="position" 
                stroke="#c084fc" 
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Position"
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
