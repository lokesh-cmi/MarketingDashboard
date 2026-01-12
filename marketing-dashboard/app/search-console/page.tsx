'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useDateRange } from '@/contexts/DateRangeContext';

interface SearchConsoleData {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

interface QueryData {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface PageData {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface SearchConsoleSummary {
  totalImpressions: number;
  totalClicks: number;
  avgCTR: number;
  avgPosition: number;
  dailyData: SearchConsoleData[];
  topQueries?: QueryData[];
  topPages?: PageData[];
}

export default function SearchConsolePage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'seo';
  const { dateRange, getDateRangeInDays } = useDateRange();
  const [data, setData] = useState<SearchConsoleSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get display text for date range
  const getDateRangeDisplayText = () => {
    switch (dateRange) {
      case 'Last Week':
        return 'last week';
      case 'Last Month':
        return 'last month';
      case 'Last Quarter':
        return 'last quarter';
      case 'Last 6 Months':
        return 'last 6 months';
      case 'Last Year':
        return 'last year';
      default:
        return 'selected period';
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const days = getDateRangeInDays();
        console.log(`[SearchConsolePage] Fetching data for ${dateRange} (${days} days)`);
        
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/search-console?days=${days}&t=${timestamp}`, {
          cache: 'no-store',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch search console data');
        }
        
        const searchData = await response.json();
        console.log(`[SearchConsolePage] Data source: ${searchData.source}`);
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
          <p className="text-gray-600 mt-2">Detailed search performance for the {getDateRangeDisplayText()}</p>
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

        {/* Queries and Pages Tables */}
        <div className="grid grid-cols-2 gap-6">
          {/* Queries Table */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Queries</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Query</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-600">Clicks</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-600">Impressions</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-600">CTR</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-600">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.topQueries || []).map((query, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-3 text-xs text-gray-900 max-w-[200px] truncate" title={query.query}>
                          {query.query}
                        </td>
                        <td className="py-2 px-3 text-xs text-gray-900 text-right">{formatNumber(query.clicks)}</td>
                        <td className="py-2 px-3 text-xs text-gray-900 text-right">{formatNumber(query.impressions)}</td>
                        <td className="py-2 px-3 text-xs text-gray-900 text-right">{query.ctr.toFixed(1)}%</td>
                        <td className="py-2 px-3 text-xs text-gray-900 text-right">{query.position.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pages Table */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Pages</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-600">Page</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-600">Clicks</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-600">Impressions</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-600">CTR</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-gray-600">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.topPages || []).map((page, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-2 px-3 text-xs text-gray-900 max-w-[200px] truncate" title={page.page}>
                          {page.page}
                        </td>
                        <td className="py-2 px-3 text-xs text-gray-900 text-right">{formatNumber(page.clicks)}</td>
                        <td className="py-2 px-3 text-xs text-gray-900 text-right">{formatNumber(page.impressions)}</td>
                        <td className="py-2 px-3 text-xs text-gray-900 text-right">{page.ctr.toFixed(1)}%</td>
                        <td className="py-2 px-3 text-xs text-gray-900 text-right">{page.position.toFixed(1)}</td>
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
