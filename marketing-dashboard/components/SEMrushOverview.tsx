'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useDateRange } from '@/contexts/DateRangeContext';

export default function SEMrushOverview() {
  const { dateRange, getDateRangeInDays } = useDateRange();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const days = getDateRangeInDays();
        console.log(`[SEMrushOverview] Fetching data for ${dateRange} (${days} days)`);
        const response = await fetch(`/api/semrush?days=${days}`);
        if (!response.ok) throw new Error('Failed to fetch SEMrush data');
        const semrushData = await response.json();
        console.log(`[SEMrushOverview] Data source: ${semrushData.source}`);
        setData(semrushData);
      } catch (err) {
        console.error('Error fetching SEMrush data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [dateRange, getDateRangeInDays]);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <p className="text-gray-500">Failed to load SEMrush data</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">SEMrush Overview</h2>
        <Link 
          href="/semrush?category=seo"
          className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 transition-colors"
        >
          View More
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Keywords Section - Expanded */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Keywords</h3>
        <div className="grid grid-cols-4 gap-3">
          {/* Top 3 Keywords */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-baseline gap-2">
              <div className="text-xs text-gray-600">Top 3</div>
              <div className="text-xl font-bold text-gray-900">{data.keywords.top3.count}</div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="text-xs text-green-600">new {data.keywords.top3.new}</div>
              <div className="text-xs text-red-600">lost {data.keywords.top3.lost}</div>
            </div>
          </div>

          {/* Top 10 Keywords */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-baseline gap-2">
              <div className="text-xs text-gray-600">Top 10</div>
              <div className="text-xl font-bold text-gray-900">{data.keywords.top10.count}</div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="text-xs text-green-600">new {data.keywords.top10.new}</div>
              <div className="text-xs text-red-600">lost {data.keywords.top10.lost}</div>
            </div>
          </div>

          {/* Top 20 Keywords */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-baseline gap-2">
              <div className="text-xs text-gray-600">Top 20</div>
              <div className="text-xl font-bold text-gray-900">{data.keywords.top20.count}</div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="text-xs text-green-600">new {data.keywords.top20.new}</div>
              <div className="text-xs text-red-600">lost {data.keywords.top20.lost}</div>
            </div>
          </div>

          {/* Top 100 Keywords */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-baseline gap-2">
              <div className="text-xs text-gray-600">Top 100</div>
              <div className="text-xl font-bold text-gray-900">{data.keywords.top100.count}</div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="text-xs text-green-600">new {data.keywords.top100.new}</div>
              <div className="text-xs text-red-600">lost {data.keywords.top100.lost}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Site Health Section - Moved to Bottom */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Site Health</h3>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Site Health Gauge - Left Side */}
          <div className="flex items-center justify-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="72"
                  cy="72"
                  r="57"
                  stroke="#E5E7EB"
                  strokeWidth="13"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="72"
                  cy="72"
                  r="57"
                  stroke="#84CC16"
                  strokeWidth="13"
                  fill="none"
                  strokeDasharray={`${(data.siteHealth.score / 100) * 358.14} 358.14`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-gray-900">{data.siteHealth.score}%</div>
                <div className="text-sm text-gray-600">Site Health</div>
              </div>
            </div>
          </div>

          {/* Errors and Warnings - Right Side */}
          <div className="space-y-4">
            {/* Errors */}
            <div>
              <div className="text-sm text-gray-600 mb-2">Errors</div>
              <div className="flex items-baseline gap-2 mb-2">
                <div className="text-3xl font-bold text-red-600">
                  {data.siteHealth.errors.toLocaleString()}
                </div>
              </div>
              <div className="h-8 relative rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-red-50"></div>
              </div>
            </div>

            {/* Warnings */}
            <div>
              <div className="text-sm text-gray-600 mb-2">Warnings</div>
              <div className="flex items-baseline gap-2 mb-2">
                <div className="text-3xl font-bold text-orange-600">
                  {data.siteHealth.warnings.toLocaleString()}
                </div>
              </div>
              <div className="h-8 relative rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
