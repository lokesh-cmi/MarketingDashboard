'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import ChartTypeSwitcher, { ChartType } from '@/components/ChartTypeSwitcher';

// Mini chart data for metric cards - showing realistic trends matching percentage changes
const adSpendMiniData = [
  { value: 3600 },
  { value: 3750 },
  { value: 3850 },
  { value: 3950 },
  { value: 4100 },
  { value: 4200 },
  { value: 4300 },
  { value: 4400 },
]; // Upward trend for +22%

const avgCpcMiniData = [
  { value: 1.52 },
  { value: 1.45 },
  { value: 1.38 },
  { value: 1.28 },
  { value: 1.18 },
  { value: 1.12 },
  { value: 1.05 },
  { value: 1.00 },
]; // Downward trend for -34%

const paidCtrMiniData = [
  { value: 0.56 },
  { value: 0.65 },
  { value: 0.75 },
  { value: 0.82 },
  { value: 0.92 },
  { value: 1.00 },
  { value: 1.08 },
  { value: 1.12 },
]; // Upward trend for +99%

const organicCtrMiniData = [
  { value: 83.6 },
  { value: 68.5 },
  { value: 55.2 },
  { value: 42.8 },
  { value: 28.5 },
  { value: 18.2 },
  { value: 12.5 },
  { value: 8.36 },
]; // Strong downward trend for -90%

// More realistic mock data for Ad to Click - showing gradual decline typical of ad campaigns
const adToClickData = [
  { day: '1', sponsoredVideo: 45000, sponsoredMessage: 28000, sponsoredUpdate: 15000 },
  { day: '2', sponsoredVideo: 47000, sponsoredMessage: 29500, sponsoredUpdate: 15800 },
  { day: '3', sponsoredVideo: 46500, sponsoredMessage: 29000, sponsoredUpdate: 15500 },
  { day: '4', sponsoredVideo: 48200, sponsoredMessage: 30200, sponsoredUpdate: 16200 },
  { day: '5', sponsoredVideo: 47800, sponsoredMessage: 29800, sponsoredUpdate: 16000 },
  { day: '6', sponsoredVideo: 46000, sponsoredMessage: 28500, sponsoredUpdate: 15200 },
  { day: '7', sponsoredVideo: 44500, sponsoredMessage: 27800, sponsoredUpdate: 14800 },
  { day: '8', sponsoredVideo: 43800, sponsoredMessage: 27200, sponsoredUpdate: 14500 },
  { day: '9', sponsoredVideo: 42500, sponsoredMessage: 26500, sponsoredUpdate: 14200 },
  { day: '10', sponsoredVideo: 41200, sponsoredMessage: 25800, sponsoredUpdate: 13800 },
  { day: '11', sponsoredVideo: 40000, sponsoredMessage: 25000, sponsoredUpdate: 13500 },
  { day: '12', sponsoredVideo: 38800, sponsoredMessage: 24200, sponsoredUpdate: 13000 },
  { day: '13', sponsoredVideo: 37500, sponsoredMessage: 23500, sponsoredUpdate: 12600 },
  { day: '14', sponsoredVideo: 36200, sponsoredMessage: 22800, sponsoredUpdate: 12200 },
  { day: '15', sponsoredVideo: 35000, sponsoredMessage: 22000, sponsoredUpdate: 11800 },
  { day: '16', sponsoredVideo: 33800, sponsoredMessage: 21200, sponsoredUpdate: 11400 },
  { day: '17', sponsoredVideo: 32500, sponsoredMessage: 20500, sponsoredUpdate: 11000 },
  { day: '18', sponsoredVideo: 31200, sponsoredMessage: 19800, sponsoredUpdate: 10600 },
  { day: '19', sponsoredVideo: 30000, sponsoredMessage: 19000, sponsoredUpdate: 10200 },
  { day: '20', sponsoredVideo: 28800, sponsoredMessage: 18200, sponsoredUpdate: 9800 },
  { day: '21', sponsoredVideo: 27500, sponsoredMessage: 17500, sponsoredUpdate: 9400 },
  { day: '22', sponsoredVideo: 26200, sponsoredMessage: 16800, sponsoredUpdate: 9000 },
  { day: '23', sponsoredVideo: 25000, sponsoredMessage: 16000, sponsoredUpdate: 8600 },
  { day: '24', sponsoredVideo: 23800, sponsoredMessage: 15200, sponsoredUpdate: 8200 },
  { day: '25', sponsoredVideo: 22500, sponsoredMessage: 14500, sponsoredUpdate: 7800 },
  { day: '26', sponsoredVideo: 21200, sponsoredMessage: 13800, sponsoredUpdate: 7400 },
  { day: '27', sponsoredVideo: 20000, sponsoredMessage: 13000, sponsoredUpdate: 7000 },
  { day: '28', sponsoredVideo: 18800, sponsoredMessage: 12200, sponsoredUpdate: 6600 },
  { day: '29', sponsoredVideo: 17500, sponsoredMessage: 11500, sponsoredUpdate: 6200 },
  { day: '30', sponsoredVideo: 16200, sponsoredMessage: 10800, sponsoredUpdate: 5800 },
];

// More realistic mock data for Post to Click - showing organic engagement patterns
const postToClickData = [
  { day: '1', video: 85, text: 65, link: 145, image: 320, gallery: 125, gif: 95 },
  { day: '2', video: 92, text: 72, link: 158, image: 342, gallery: 135, gif: 105 },
  { day: '3', video: 88, text: 68, link: 152, image: 335, gallery: 130, gif: 100 },
  { day: '4', video: 95, text: 75, link: 165, image: 358, gallery: 142, gif: 112 },
  { day: '5', video: 90, text: 70, link: 160, image: 348, gallery: 138, gif: 108 },
  { day: '6', video: 82, text: 62, link: 142, image: 315, gallery: 122, gif: 92 },
  { day: '7', video: 78, text: 58, link: 135, image: 298, gallery: 115, gif: 85 },
  { day: '8', video: 93, text: 73, link: 162, image: 352, gallery: 140, gif: 110 },
  { day: '9', video: 88, text: 68, link: 155, image: 338, gallery: 132, gif: 102 },
  { day: '10', video: 96, text: 76, link: 168, image: 365, gallery: 145, gif: 115 },
  { day: '11', video: 91, text: 71, link: 160, image: 350, gallery: 138, gif: 108 },
  { day: '12', video: 98, text: 78, link: 172, image: 375, gallery: 148, gif: 118 },
  { day: '13', video: 94, text: 74, link: 165, image: 360, gallery: 142, gif: 112 },
  { day: '14', video: 87, text: 67, link: 150, image: 330, gallery: 128, gif: 98 },
  { day: '15', video: 100, text: 80, link: 178, image: 388, gallery: 152, gif: 122 },
  { day: '16', video: 95, text: 75, link: 168, image: 368, gallery: 145, gif: 115 },
  { day: '17', video: 102, text: 82, link: 182, image: 398, gallery: 156, gif: 126 },
  { day: '18', video: 97, text: 77, link: 172, image: 378, gallery: 148, gif: 118 },
  { day: '19', video: 105, text: 85, link: 188, image: 410, gallery: 162, gif: 132 },
  { day: '20', video: 99, text: 79, link: 175, image: 385, gallery: 150, gif: 120 },
  { day: '21', video: 108, text: 88, link: 195, image: 425, gallery: 168, gif: 138 },
  { day: '22', video: 103, text: 83, link: 185, image: 405, gallery: 160, gif: 130 },
  { day: '23', video: 110, text: 90, link: 200, image: 438, gallery: 172, gif: 142 },
  { day: '24', video: 106, text: 86, link: 190, image: 418, gallery: 165, gif: 135 },
  { day: '25', video: 112, text: 92, link: 205, image: 448, gallery: 178, gif: 148 },
  { day: '26', video: 108, text: 88, link: 195, image: 428, gallery: 170, gif: 140 },
  { day: '27', video: 115, text: 95, link: 212, image: 462, gallery: 182, gif: 152 },
  { day: '28', video: 110, text: 90, link: 202, image: 442, gallery: 175, gif: 145 },
  { day: '29', video: 118, text: 98, link: 218, image: 475, gallery: 188, gif: 158 },
  { day: '30', video: 114, text: 94, link: 208, image: 455, gallery: 180, gif: 150 },
];

export default function LinkedInAdsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'paid-campaigns';
  const [adToClickChartType, setAdToClickChartType] = useState<ChartType>('area');
  const [postToClickChartType, setPostToClickChartType] = useState<ChartType>('area');

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
            <h1 className="text-3xl font-bold text-gray-900">LinkedIn Ads Overview</h1>
            <p className="text-gray-600 mt-2">📊 Analyze how owned and earned LinkedIn activities stack up against paid</p>
          </div>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">LinkedIn Ad Spend</div>
            <div className="flex items-baseline gap-2 mb-1">
              <div className="text-4xl font-bold text-gray-900">$4.4K</div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                22%
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-3">Cost (USD)</div>
            <div className="mt-2">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={adSpendMiniData}>
                  <Area type="monotone" dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Avg CPC</div>
            <div className="flex items-baseline gap-2 mb-1">
              <div className="text-4xl font-bold text-gray-900">€1</div>
              <div className="text-sm text-red-600 flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                34%
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-3">Avg CPC</div>
            <div className="mt-2">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={avgCpcMiniData}>
                  <Area type="monotone" dataKey="value" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Paid Avg CTR</div>
            <div className="flex items-baseline gap-2 mb-1">
              <div className="text-4xl font-bold text-gray-900">1.12%</div>
              <div className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                99%
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-3">Avg CTR</div>
            <div className="mt-2">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={paidCtrMiniData}>
                  <Area type="monotone" dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-sm text-gray-600 mb-2">Organic CTR</div>
            <div className="flex items-baseline gap-2 mb-1">
              <div className="text-4xl font-bold text-gray-900">8.36%</div>
              <div className="text-sm text-red-600 flex items-center gap-1">
                <TrendingDown className="w-4 h-4" />
                90%
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-3">Click-Through Rate</div>
            <div className="mt-2">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={organicCtrMiniData}>
                  <Area type="monotone" dataKey="value" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Ad to Click Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Ad to Click</h2>
          
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold text-gray-900">168,967</div>
              <div className="text-sm text-gray-500 mt-1">Reach</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">3,072</div>
              <div className="text-sm text-gray-500 mt-1">Engagements</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">2,693</div>
              <div className="text-sm text-gray-500 mt-1">Clicks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">0.65</div>
              <div className="text-sm text-gray-500 mt-1">Engagement Rate</div>
            </div>
          </div>

          <div className="relative">
            <ChartTypeSwitcher
              currentType={adToClickChartType}
              availableTypes={['area', 'line', 'bar']}
              onTypeChange={setAdToClickChartType}
            />

            <ResponsiveContainer width="100%" height={280}>
              {adToClickChartType === 'line' ? (
                <LineChart data={adToClickData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={true} horizontal={false} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12, fill: '#999' }} 
                    axisLine={{ stroke: '#f0f0f0' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#999' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 12, paddingTop: 20 }}
                    iconType="circle"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sponsoredVideo" 
                    stroke="#1E3A8A" 
                    strokeWidth={2}
                    name="Sponsored Video"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sponsoredMessage" 
                    stroke="#60A5FA" 
                    strokeWidth={2}
                    name="Sponsored Message"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sponsoredUpdate" 
                    stroke="#BFDBFE" 
                    strokeWidth={2}
                    name="Sponsored Status Update"
                  />
                </LineChart>
              ) : adToClickChartType === 'bar' ? (
                <BarChart data={adToClickData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={true} horizontal={false} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12, fill: '#999' }} 
                    axisLine={{ stroke: '#f0f0f0' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#999' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 12, paddingTop: 20 }}
                    iconType="circle"
                  />
                  <Bar 
                    dataKey="sponsoredVideo" 
                    stackId="1" 
                    fill="#1E3A8A" 
                    name="Sponsored Video"
                  />
                  <Bar 
                    dataKey="sponsoredMessage" 
                    stackId="1" 
                    fill="#60A5FA" 
                    name="Sponsored Message"
                  />
                  <Bar 
                    dataKey="sponsoredUpdate" 
                    stackId="1" 
                    fill="#BFDBFE" 
                    name="Sponsored Status Update"
                  />
                </BarChart>
              ) : (
                <AreaChart data={adToClickData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVideo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorMessage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorUpdate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#BFDBFE" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#BFDBFE" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={true} horizontal={false} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12, fill: '#999' }} 
                    axisLine={{ stroke: '#f0f0f0' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#999' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 12, paddingTop: 20 }}
                    iconType="circle"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sponsoredVideo" 
                    stackId="1" 
                    stroke="#1E3A8A" 
                    fill="url(#colorVideo)" 
                    name="Sponsored Video"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sponsoredMessage" 
                    stackId="1" 
                    stroke="#60A5FA" 
                    fill="url(#colorMessage)" 
                    name="Sponsored Message"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sponsoredUpdate" 
                    stackId="1" 
                    stroke="#BFDBFE" 
                    fill="url(#colorUpdate)" 
                    name="Sponsored Status Update"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Post to Click Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Post to Click</h2>
          
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold text-gray-900">970</div>
              <div className="text-sm text-gray-500 mt-1">Reach</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">52</div>
              <div className="text-sm text-gray-500 mt-1">Engagements</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">25</div>
              <div className="text-sm text-gray-500 mt-1">Clicks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">0.92</div>
              <div className="text-sm text-gray-500 mt-1">Engagement Rate</div>
            </div>
          </div>

          <div className="relative">
            <ChartTypeSwitcher
              currentType={postToClickChartType}
              availableTypes={['area', 'line', 'bar']}
              onTypeChange={setPostToClickChartType}
            />

            <ResponsiveContainer width="100%" height={280}>
              {postToClickChartType === 'line' ? (
                <LineChart data={postToClickData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={true} horizontal={false} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12, fill: '#999' }} 
                    axisLine={{ stroke: '#f0f0f0' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#999' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 12, paddingTop: 20 }}
                    iconType="circle"
                  />
                  <Line type="monotone" dataKey="gif" stroke="#3B82F6" strokeWidth={2} name="GIF" />
                  <Line type="monotone" dataKey="gallery" stroke="#06B6D4" strokeWidth={2} name="Gallery" />
                  <Line type="monotone" dataKey="image" stroke="#84CC16" strokeWidth={2} name="Image" />
                  <Line type="monotone" dataKey="link" stroke="#EAB308" strokeWidth={2} name="Link" />
                  <Line type="monotone" dataKey="text" stroke="#F97316" strokeWidth={2} name="Text" />
                  <Line type="monotone" dataKey="video" stroke="#DC2626" strokeWidth={2} name="Video" />
                </LineChart>
              ) : postToClickChartType === 'bar' ? (
                <BarChart data={postToClickData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={true} horizontal={false} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12, fill: '#999' }} 
                    axisLine={{ stroke: '#f0f0f0' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#999' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 12, paddingTop: 20 }}
                    iconType="circle"
                  />
                  <Bar dataKey="gif" stackId="1" fill="#3B82F6" name="GIF" />
                  <Bar dataKey="gallery" stackId="1" fill="#06B6D4" name="Gallery" />
                  <Bar dataKey="image" stackId="1" fill="#84CC16" name="Image" />
                  <Bar dataKey="link" stackId="1" fill="#EAB308" name="Link" />
                  <Bar dataKey="text" stackId="1" fill="#F97316" name="Text" />
                  <Bar dataKey="video" stackId="1" fill="#DC2626" name="Video" />
                </BarChart>
              ) : (
                <AreaChart data={postToClickData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGif" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorGallery" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorImage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#84CC16" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#84CC16" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorLink" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EAB308" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#EAB308" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorText" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorVideoPost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={true} horizontal={false} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12, fill: '#999' }} 
                    axisLine={{ stroke: '#f0f0f0' }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#999' }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: 12, paddingTop: 20 }}
                    iconType="circle"
                  />
                  <Area type="monotone" dataKey="gif" stackId="1" stroke="#3B82F6" fill="url(#colorGif)" name="GIF" />
                  <Area type="monotone" dataKey="gallery" stackId="1" stroke="#06B6D4" fill="url(#colorGallery)" name="Gallery" />
                  <Area type="monotone" dataKey="image" stackId="1" stroke="#84CC16" fill="url(#colorImage)" name="Image" />
                  <Area type="monotone" dataKey="link" stackId="1" stroke="#EAB308" fill="url(#colorLink)" name="Link" />
                  <Area type="monotone" dataKey="text" stackId="1" stroke="#F97316" fill="url(#colorText)" name="Text" />
                  <Area type="monotone" dataKey="video" stackId="1" stroke="#DC2626" fill="url(#colorVideoPost)" name="Video" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
