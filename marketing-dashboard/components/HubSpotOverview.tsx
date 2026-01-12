'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDateRange } from '@/contexts/DateRangeContext';

interface DealsMetrics {
  totalDeals: number;
  totalAmount: string;
}

interface ContactLifecycleData {
  stage: string;
  digital: number;
  events: number;
}

interface HubSpotOverviewData {
  dealsMetrics: DealsMetrics;
  contactLifecycleData: ContactLifecycleData[];
}

export default function HubSpotOverview() {
  const { dateRange, getDateRangeInDays } = useDateRange();
  const [data, setData] = useState<HubSpotOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const days = getDateRangeInDays();
        console.log(`[HubSpotOverview] Fetching data for ${dateRange} (${days} days)`);
        
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/hubspot?days=${days}&t=${timestamp}`, {
          cache: 'no-store',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch HubSpot overview data');
        }
        
        const hubspotData = await response.json();
        console.log(`[HubSpotOverview] Data source: ${hubspotData.source}`);
        setData(hubspotData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching HubSpot overview data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [dateRange, getDateRangeInDays]);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">HubSpot Overview</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading HubSpot data...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">HubSpot Overview</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error: {error || 'Failed to load data'}</div>
        </div>
      </div>
    );
  }

  const { dealsMetrics, contactLifecycleData } = data;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">HubSpot Overview</h2>
          <Link
            href="/hubspot?category=seo"
            className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 transition-colors"
          >
            View More
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Total Deals Metrics */}
      <div className="mb-6">
        <h3 className="text-sm text-gray-500 mb-3">
          Total Deals sourced by Marketing FY25
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">(COUNT) DEALS</div>
            <div className="text-2xl font-semibold text-gray-900">{dealsMetrics.totalDeals}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">(SUM) AMOUNT IN COMPANY CURRENCY</div>
            <div className="text-2xl font-semibold text-gray-900">{dealsMetrics.totalAmount}</div>
          </div>
        </div>
      </div>

      {/* Marketing Contacts Breakdown */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-sm text-gray-500 mb-3">
          Marketing Contacts breakdown by Contact Lifecycle Stages
        </h3>

        <div className="flex items-center gap-4 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-600 rounded"></div>
            <span className="text-gray-600">Marketing Sourced - Digital</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-300 rounded"></div>
            <span className="text-gray-600">Marketing Sourced - Events</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={contactLifecycleData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: '#999' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              type="category"
              dataKey="stage"
              tick={{ fontSize: 11, fill: '#666' }}
              width={110}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }}
            />
            <Bar dataKey="digital" stackId="a" fill="#9333ea" radius={[0, 0, 0, 0]} />
            <Bar dataKey="events" stackId="a" fill="#d8b4fe" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
