'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useDateRange } from '@/contexts/DateRangeContext';

export default function OktopostOverview() {
  const { dateRange, getDateRangeInDays } = useDateRange();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const days = getDateRangeInDays();
        console.log(`[OktopostOverview] Fetching data for ${dateRange} (${days} days)`);
        const response = await fetch(`/api/oktopost?days=${days}`);
        if (!response.ok) throw new Error('Failed to fetch Oktopost data');
        const oktopostData = await response.json();
        console.log(`[OktopostOverview] Data source: ${oktopostData.source}`);
        setData(oktopostData);
      } catch (err) {
        console.error('Error fetching Oktopost data:', err);
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
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="col-span-2 space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-5 gap-4 mb-6">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data || !data.platforms) {
    return (
      <div className="col-span-2 space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-500">Failed to load Oktopost data</p>
        </div>
      </div>
    );
  }

  const linkedInData = data.platforms.find((p: any) => p.platform === 'LinkedIn');
  const instagramData = data.platforms.find((p: any) => p.platform === 'Instagram');
  const facebookData = data.platforms.find((p: any) => p.platform === 'Facebook');
  const twitterData = data.platforms.find((p: any) => p.platform === 'Twitter');

  const renderPlatform = (platformData: any, platformName: string, bgColor: string, icon: string) => {
    if (!platformData) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 ${bgColor} rounded flex items-center justify-center text-white font-bold text-lg`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{platformName} Performance</h3>
            <p className="text-sm text-gray-500">{platformName} engagement metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Followers</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(platformData.metrics.followers.value)}</div>
            <div className={`text-xs mt-1 ${platformData.metrics.followers.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {platformData.metrics.followers.change >= 0 ? '↑' : '↓'} {Math.abs(platformData.metrics.followers.change).toFixed(1)}%
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Impressions</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(platformData.metrics.impressions.value)}</div>
            <div className={`text-xs mt-1 ${platformData.metrics.impressions.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {platformData.metrics.impressions.change >= 0 ? '↑' : '↓'} {Math.abs(platformData.metrics.impressions.change).toFixed(1)}%
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Engagement</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(platformData.metrics.engagement.value)}</div>
            <div className={`text-xs mt-1 ${platformData.metrics.engagement.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {platformData.metrics.engagement.change >= 0 ? '↑' : '↓'} {Math.abs(platformData.metrics.engagement.change).toFixed(1)}%
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Clicks</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(platformData.metrics.clicks.value)}</div>
            <div className={`text-xs mt-1 ${platformData.metrics.clicks.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {platformData.metrics.clicks.change >= 0 ? '↑' : '↓'} {Math.abs(platformData.metrics.clicks.change).toFixed(1)}%
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">
              {platformName === 'LinkedIn' ? 'Shares' : 
               platformName === 'Instagram' ? 'Saves' :
               platformName === 'Facebook' ? 'Shares' : 'Retweets'}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(
                platformName === 'LinkedIn' ? platformData.metrics.shares.value :
                platformName === 'Instagram' ? platformData.metrics.saves.value :
                platformName === 'Facebook' ? platformData.metrics.shares.value :
                platformData.metrics.retweets.value
              )}
            </div>
            <div className={`text-xs mt-1 ${
              (platformName === 'LinkedIn' ? platformData.metrics.shares.change :
               platformName === 'Instagram' ? platformData.metrics.saves.change :
               platformName === 'Facebook' ? platformData.metrics.shares.change :
               platformData.metrics.retweets.change) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {(platformName === 'LinkedIn' ? platformData.metrics.shares.change :
                platformName === 'Instagram' ? platformData.metrics.saves.change :
                platformName === 'Facebook' ? platformData.metrics.shares.change :
                platformData.metrics.retweets.change) >= 0 ? '↑' : '↓'}{' '}
              {Math.abs(
                platformName === 'LinkedIn' ? platformData.metrics.shares.change :
                platformName === 'Instagram' ? platformData.metrics.saves.change :
                platformName === 'Facebook' ? platformData.metrics.shares.change :
                platformData.metrics.retweets.change
              ).toFixed(1)}%
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={platformData.chartData}>
            <defs>
              <linearGradient id={`color${platformName}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={bgColor.includes('0077B5') ? '#0077B5' : bgColor.includes('C13584') ? '#C13584' : bgColor.includes('1877F2') ? '#1877F2' : '#1DA1F2'} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={bgColor.includes('0077B5') ? '#0077B5' : bgColor.includes('C13584') ? '#C13584' : bgColor.includes('1877F2') ? '#1877F2' : '#1DA1F2'} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#999" />
            <YAxis tick={{ fontSize: 11 }} stroke="#999" />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} />
            <Area type="monotone" dataKey="engagement" stroke={bgColor.includes('0077B5') ? '#0077B5' : bgColor.includes('C13584') ? '#C13584' : bgColor.includes('1877F2') ? '#1877F2' : '#1DA1F2'} fill={`url(#color${platformName})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="col-span-2 space-y-6">
      {/* LinkedIn Analytics */}
      {renderPlatform(linkedInData, 'LinkedIn', 'bg-[#0077B5]', 'in')}
      
      {/* Instagram Analytics */}
      {renderPlatform(instagramData, 'Instagram', 'bg-gradient-to-br from-[#833AB4] via-[#C13584] to-[#E1306C]', 'IG')}
      
      {/* Facebook Analytics */}
      {renderPlatform(facebookData, 'Facebook', 'bg-[#1877F2]', 'f')}
      
      {/* Twitter Analytics */}
      {renderPlatform(twitterData, 'Twitter', 'bg-[#1DA1F2]', '𝕏')}
    </div>
  );
}
