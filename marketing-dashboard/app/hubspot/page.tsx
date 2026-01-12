'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { dealsBreakdown as mockDealsBreakdown } from '@/lib/mock-data/hubspotDetailData';

export default function HubSpotPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'seo';
  const [pipelineData, setPipelineData] = useState<any[]>([]);
  const [dealsData, setDealsData] = useState({ totalDeals: 0, totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const dealsBreakdown = mockDealsBreakdown; // Use the mock data

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/hubspot/detail');
        const result = await response.json();
        
        if (result.data) {
          setPipelineData(result.data.pipelineData || []);
          setDealsData(result.data.summary || { totalDeals: 0, totalAmount: 0 });
        }
      } catch (error) {
        console.error('Error fetching HubSpot detail:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `€${(value / 1000).toFixed(2)}K`;
    }
    return `€${value.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8 flex items-center justify-center h-96">
          <div className="text-gray-500">Loading...</div>
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
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">HubSpot Dashboard</h1>
            <p className="text-gray-600 mt-2">Marketing Performance Overview</p>
          </div>
        </div>

        {/* Total Deals Sourced Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Total Deals sourced by Marketing FY25 (100% sourced this year)
          </h2>
          <div className="text-xs text-gray-600 mb-6">FILTERS (2)</div>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">(COUNT) DEALS</div>
              <div className="text-5xl font-bold text-purple-600">{dealsData.totalDeals}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">(SUM) AMOUNT IN COMPANY CURRENCY</div>
              <div className="text-3xl font-bold text-purple-600">{formatCurrency(dealsData.totalAmount)}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Active Deals */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Marketing Sourced | Active deals | 2025
              </h3>
              <div className="text-xs text-gray-600 mb-4">FILTERS (4)</div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">(COUNT) DEALS</div>
                  <div className="text-4xl font-bold text-purple-600">{dealsBreakdown.active.count}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">(SUM) AMOUNT IN COMPANY CURRENCY</div>
                  <div className="text-xl font-bold text-purple-600">{dealsBreakdown.active.amount}</div>
                </div>
              </div>
            </div>

            {/* Lost Deals */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Marketing Sourced | Lost deals | 2025
              </h3>
              <div className="text-xs text-gray-600 mb-4">FILTERS (4)</div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">(COUNT) DEALS</div>
                  <div className="text-4xl font-bold text-purple-600">{dealsBreakdown.lost.count}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">(SUM) AMOUNT IN COMPANY CURRENCY</div>
                  <div className="text-xl font-bold text-purple-600">{dealsBreakdown.lost.amount}</div>
                </div>
              </div>
            </div>

            {/* Won Deals */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Marketing Sourced - Deals Won in 2025 [...]
              </h3>
              <div className="text-xs text-gray-600 mb-4">FILTERS (4)</div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">(COUNT) DEALS</div>
                  <div className="text-4xl font-bold text-purple-600">{dealsBreakdown.won.count}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">(SUM) AMOUNT IN COMPANY CURRENCY</div>
                  <div className="text-xl font-bold text-purple-600">{dealsBreakdown.won.amount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Total Deals Pipeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Pipeline by Marketing Sources- 2025 - Total Deals
            </h2>
            <div className="text-xs text-gray-600 mb-4">FILTERS (3)</div>
            <div className="text-xs text-gray-500 mb-4">● Return Amount in company currency</div>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={pipelineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="source" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 10, fill: '#666' }}
                  interval={0}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#999' }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip 
                  formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                />
                <Bar dataKey="amount" fill="#9333ea" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Won Deals Pipeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Pipeline won in 2025 - By marketing Sources/Channel
            </h2>
            <div className="text-xs text-gray-600 mb-4">FILTERS (4)</div>
            <div className="text-xs text-gray-500 mb-4">✓ (Sum) Amount in company currency</div>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={pipelineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="source" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 10, fill: '#666' }}
                  interval={0}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#999' }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip 
                  formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                />
                <Bar dataKey="amount" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
