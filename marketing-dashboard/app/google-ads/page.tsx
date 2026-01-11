'use client';

import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Mock data for clicks over time (line chart)
const clicksOverTimeData = [
  { date: '15 Dec', clicks: 9 },
  { date: '16 Dec', clicks: 15 },
  { date: '17 Dec', clicks: 12 },
  { date: '18 Dec', clicks: 13 },
  { date: '19 Dec', clicks: 15 },
  { date: '20 Dec', clicks: 9 },
  { date: '21 Dec', clicks: 14 },
  { date: '22 Dec', clicks: 15 },
  { date: '23 Dec', clicks: 13 },
  { date: '24 Dec', clicks: 14 },
  { date: '25 Dec', clicks: 10 },
  { date: '26 Dec', clicks: 15 },
  { date: '27 Dec', clicks: 16 },
  { date: '28 Dec', clicks: 13 },
  { date: '29 Dec', clicks: 15 },
  { date: '30 Dec', clicks: 14 },
  { date: '31 Dec', clicks: 13 },
  { date: '1 Jan', clicks: 12 },
  { date: '2 Jan', clicks: 14 },
  { date: '3 Jan', clicks: 10 },
  { date: '4 Jan', clicks: 13 },
  { date: '5 Jan', clicks: 19 },
  { date: '6 Jan', clicks: 18 },
];

// Mock data for clicks by campaign (bar chart)
const clicksByCampaignData = [
  { campaign: 'Acme Dental', clicks: 60 },
  { campaign: 'Acme Auto Body', clicks: 58 },
  { campaign: 'Acme Marketing', clicks: 60 },
  { campaign: 'Acme Law', clicks: 58 },
];

// Mock data for campaigns table
const campaignsData = [
  {
    name: 'Acme Law',
    searchImprShare: '30.00%',
    status: 'ENABLED',
    network: 'DISPLAY NETW...',
    viewThroughConv: 91,
    avgCPC: '$216.00',
    clicks: 31,
    conversionRate: '10.43%',
  },
  {
    name: 'Acme Dental',
    searchImprShare: '31.00%',
    status: 'PAUSED',
    network: 'SEARCH NETWO...',
    viewThroughConv: 96,
    avgCPC: '$192.00',
    clicks: 29,
    conversionRate: '8.74%',
  },
  {
    name: 'Acme Marketing',
    searchImprShare: '31.00%',
    status: 'PAUSED',
    network: 'SEARCH NETWO...',
    viewThroughConv: 116,
    avgCPC: '$293.00',
    clicks: 29,
    conversionRate: '9.05%',
  },
  {
    name: 'Acme Auto Body',
    searchImprShare: '29.00%',
    status: 'PAUSED',
    network: 'DISPLAY NETW...',
    viewThroughConv: 94,
    avgCPC: '$146.00',
    clicks: 24,
    conversionRate: '8.65%',
  },
];

export default function GoogleAdsPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Google Ads Campaign Performance</h1>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Clicks Over Time - Line Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Clicks</h2>
                <div className="text-3xl font-bold text-gray-900 mt-2">407</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={clicksOverTimeData}>
                <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11, fill: '#999' }} 
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                  interval={3}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#999' }} 
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 20]}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="clicks" 
                  stroke="#4285F4" 
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Clicks by Campaign - Bar Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Clicks</h2>
                <div className="text-3xl font-bold text-gray-900 mt-2">240</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={clicksByCampaignData}>
                <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="campaign" 
                  tick={{ fontSize: 10, fill: '#999' }} 
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#999' }} 
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 80]}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }}
                />
                <Bar 
                  dataKey="clicks" 
                  fill="#4285F4" 
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metrics Cards - Row 1 */}
        <div className="grid grid-cols-5 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">Search Impr. Share</div>
            <div className="text-3xl font-bold text-gray-900">27.27%</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">View-Through Conv.</div>
            <div className="text-3xl font-bold text-gray-900">3,169</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">Avg CPC</div>
            <div className="text-3xl font-bold text-gray-900">$4.06</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">Clicks</div>
            <div className="text-3xl font-bold text-gray-900">1,350</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">Conversion Rate</div>
            <div className="text-3xl font-bold text-gray-900">45.56%</div>
          </div>
        </div>

        {/* Metrics Cards - Row 2 */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">Conversions</div>
            <div className="text-3xl font-bold text-gray-900">615</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">Cost</div>
            <div className="text-3xl font-bold text-gray-900">$5,477.00</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">Cost / Conversion</div>
            <div className="text-3xl font-bold text-gray-900">$8.91</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">CTR</div>
            <div className="text-3xl font-bold text-gray-900">600%</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-500 mb-2">Impressions</div>
            <div className="text-3xl font-bold text-gray-900">225</div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">Showing 4 of 4 Rows</div>
            <input 
              type="text" 
              placeholder="Search"
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Search Impr. S...
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Network
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    View-Through ...
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Avg CPC
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Conversion ...
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaignsData.map((campaign, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.searchImprShare}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === 'ENABLED' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {campaign.network}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.viewThroughConv}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.avgCPC}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.clicks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.conversionRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
