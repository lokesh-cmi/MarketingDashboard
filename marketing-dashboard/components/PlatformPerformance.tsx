'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDateRange } from '@/contexts/DateRangeContext';
import ChartTypeSwitcher, { ChartType } from './ChartTypeSwitcher';

interface PlatformPerformanceProps {
  platform: 'LinkedIn' | 'Instagram' | 'Facebook' | 'Twitter';
  bgColor: string;
  icon: string;
}

export default function PlatformPerformance({ platform, bgColor, icon }: PlatformPerformanceProps) {
  const { dateRange, getDateRangeInDays } = useDateRange();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState<ChartType>('area');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const days = getDateRangeInDays();
        const response = await fetch(`/api/oktopost?days=${days}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const oktopostData = await response.json();
        const platformData = oktopostData.platforms.find((p: any) => p.platform === platform);
        setData(platformData);
      } catch (err) {
        console.error(`Error fetching ${platform} data:`, err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [dateRange, getDateRangeInDays, platform]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-5 gap-4 mb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="h-48 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <p className="text-gray-500">Failed to load {platform} data</p>
      </div>
    );
  }

  const getGradientId = () => `color${platform}`;
  const getGradientColors = () => {
    switch (platform) {
      case 'LinkedIn': return { start: '#9333ea', end: '#9333ea' };      // purple-600
      case 'Instagram': return { start: '#a855f7', end: '#c084fc' };    // purple-500 to purple-400
      case 'Facebook': return { start: '#7c3aed', end: '#7c3aed' };     // purple-700
      case 'Twitter': return { start: '#8b5cf6', end: '#8b5cf6' };      // purple-500
    }
  };

  const colors = getGradientColors();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 ${bgColor} rounded flex items-center justify-center text-white font-bold text-lg`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{platform} Performance</h3>
          <p className="text-sm text-gray-500">{platform} engagement metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="text-sm text-gray-600 mb-1">Followers</div>
          <div className="text-2xl font-bold text-gray-900">{formatNumber(data.metrics.followers.value)}</div>
          <div className={`text-xs mt-1 ${data.metrics.followers.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.metrics.followers.change >= 0 ? '↑' : '↓'} {Math.abs(data.metrics.followers.change).toFixed(1)}%
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="text-sm text-gray-600 mb-1">Impressions</div>
          <div className="text-2xl font-bold text-gray-900">{formatNumber(data.metrics.impressions.value)}</div>
          <div className={`text-xs mt-1 ${data.metrics.impressions.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.metrics.impressions.change >= 0 ? '↑' : '↓'} {Math.abs(data.metrics.impressions.change).toFixed(1)}%
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="text-sm text-gray-600 mb-1">Engagement</div>
          <div className="text-2xl font-bold text-gray-900">{formatNumber(data.metrics.engagement.value)}</div>
          <div className={`text-xs mt-1 ${data.metrics.engagement.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.metrics.engagement.change >= 0 ? '↑' : '↓'} {Math.abs(data.metrics.engagement.change).toFixed(1)}%
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="text-sm text-gray-600 mb-1">Clicks</div>
          <div className="text-2xl font-bold text-gray-900">{formatNumber(data.metrics.clicks.value)}</div>
          <div className={`text-xs mt-1 ${data.metrics.clicks.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.metrics.clicks.change >= 0 ? '↑' : '↓'} {Math.abs(data.metrics.clicks.change).toFixed(1)}%
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="text-sm text-gray-600 mb-1">
            {platform === 'LinkedIn' ? 'Shares' : 
             platform === 'Instagram' ? 'Saves' :
             platform === 'Facebook' ? 'Shares' : 'Retweets'}
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(
              platform === 'LinkedIn' ? data.metrics.shares.value :
              platform === 'Instagram' ? data.metrics.saves.value :
              platform === 'Facebook' ? data.metrics.shares.value :
              data.metrics.retweets.value
            )}
          </div>
          <div className={`text-xs mt-1 ${
            (platform === 'LinkedIn' ? data.metrics.shares.change :
             platform === 'Instagram' ? data.metrics.saves.change :
             platform === 'Facebook' ? data.metrics.shares.change :
             data.metrics.retweets.change) >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {(platform === 'LinkedIn' ? data.metrics.shares.change :
              platform === 'Instagram' ? data.metrics.saves.change :
              platform === 'Facebook' ? data.metrics.shares.change :
              data.metrics.retweets.change) >= 0 ? '↑' : '↓'}{' '}
            {Math.abs(
              platform === 'LinkedIn' ? data.metrics.shares.change :
              platform === 'Instagram' ? data.metrics.saves.change :
              platform === 'Facebook' ? data.metrics.shares.change :
              data.metrics.retweets.change
            ).toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="relative">
        <ChartTypeSwitcher
          currentType={chartType}
          availableTypes={['area', 'line', 'bar']}
          onTypeChange={setChartType}
        />

        <ResponsiveContainer width="100%" height={220}>
          {chartType === 'line' ? (
            <LineChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#999" />
              <YAxis tick={{ fontSize: 11 }} stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} />
              <Line type="monotone" dataKey="engagement" stroke={colors.start} strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          ) : chartType === 'bar' ? (
            <BarChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#999" />
              <YAxis tick={{ fontSize: 11 }} stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} />
              <Bar dataKey="engagement" fill={colors.start} />
            </BarChart>
          ) : (
            <AreaChart data={data.chartData}>
              <defs>
                <linearGradient id={getGradientId()} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.start} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors.end} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#999" />
              <YAxis tick={{ fontSize: 11 }} stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} />
              <Area type="monotone" dataKey="engagement" stroke={colors.start} fill={`url(#${getGradientId()})`} />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
