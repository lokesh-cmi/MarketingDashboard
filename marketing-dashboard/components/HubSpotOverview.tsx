'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { contactLifecycleData, dealsMetrics } from '@/lib/hubspotData';

export default function HubSpotOverview() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">HubSpot Overview</h2>
        <Link 
          href="/hubspot"
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
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
            <div className="w-3 h-3 bg-cyan-400 rounded"></div>
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
            <Bar dataKey="digital" stackId="a" fill="#7C3AED" radius={[0, 0, 0, 0]} />
            <Bar dataKey="events" stackId="a" fill="#22D3EE" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
