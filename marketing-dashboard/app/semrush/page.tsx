'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { useDateRange } from '@/contexts/DateRangeContext';
import { 
  aiVisibilityStats,
  aiVisibilityTrend,
  aiToolsStats,
  seoStats,
  visibilityData,
  seoCheckerData
} from '@/lib/mock-data/semrushData';

export default function SEMrushPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'seo';
  const { dateRange, getDateRangeInDays } = useDateRange();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const days = getDateRangeInDays();
        console.log(`[SEMrushPage] Fetching data for ${dateRange} (${days} days)`);
        const response = await fetch(`/api/semrush?days=${days}`);
        if (!response.ok) throw new Error('Failed to fetch SEMrush data');
        const semrushData = await response.json();
        console.log(`[SEMrushPage] Data source: ${semrushData.source}`);
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
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-2 gap-6">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <p className="text-gray-500">Failed to load SEMrush data</p>
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
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SEO Dashboard: xebia</h1>
            </div>
          </div>
        </div>

        {/* Top Section: AI Search and SEO */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* AI Search Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🔍</span>
              <h2 className="text-lg font-semibold text-gray-900">AI Search</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-xs text-gray-600 mb-1">AI Visibility</div>
                <div className="flex items-end gap-3">
                  <div className="text-3xl font-bold text-orange-500">{aiVisibilityStats.aiVisibility}</div>
                  <div className="mb-1">
                    <ResponsiveContainer width={60} height={30}>
                      <LineChart data={aiVisibilityTrend} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#9333ea" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Mentions</div>
                <div className="text-3xl font-bold text-gray-900">{aiVisibilityStats.mentions}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">Cited pages</div>
                <div className="text-3xl font-bold text-gray-900">{aiVisibilityStats.citedPages}</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {aiToolsStats.map((tool) => (
                <div key={tool.name}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{tool.icon}</span>
                    <span className="text-xs font-medium text-gray-700">{tool.name}</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <div className="text-xs text-gray-500">Mentions</div>
                    <div className="text-xl font-bold text-gray-900">{tool.mentions}</div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-xs text-gray-500">Cited pages</div>
                    <div className="text-sm text-gray-700">{tool.citedPages}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">📊</span>
              <h2 className="text-lg font-semibold text-gray-900">SEO</h2>
              <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Root Domain</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="text-xs text-gray-600">Authority Score</div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-bold text-gray-900">{seoStats.authorityScore}</div>
                    <div className="text-xs text-gray-500">{seoStats.authorityChange}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Semrush Rank ↑ 50K</div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-xs text-gray-600">Organic Traffic</div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-bold text-gray-900">{seoStats.organicTraffic}</div>
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {seoStats.trafficChange}%
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-2">Ref. Domains</div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-bold text-gray-900">{seoStats.refDomains}</div>
                    <div className="text-xs text-red-600 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {Math.abs(seoStats.domainsChange)}%
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Backlinks ↑ {seoStats.backlinks}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div></div>
                
                <div>
                  <div className="text-xs text-gray-600 mb-1">Organic Keywords</div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold text-gray-900">{seoStats.organicKeywords}</div>
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {seoStats.keywordsChange}%
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">Paid Keywords</div>
                  <div className="text-2xl font-bold text-gray-900">{seoStats.paidKeywords}</div>
                  <div className="text-xs text-gray-500">Paid Traffic {seoStats.paidTraffic}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Position Tracking Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Position Tracking</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🇺🇸 United States (Google) - English</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {/* Visibility Section */}
            <div>
              <div className="flex items-baseline gap-2 mb-4">
                <div className="text-sm text-gray-600">Visibility</div>
                <div className="text-3xl font-bold text-gray-900">1.51%</div>
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +0.29%
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={visibilityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="visibilityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 10, fill: '#999' }} 
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                    interval={4}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: '#999' }} 
                    axisLine={false}
                    tickLine={false}
                    domain={[1.0, 1.7]}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '11px' }}
                    formatter={(value: number | undefined) => value ? [`${value.toFixed(2)}%`, 'Visibility'] : ['', '']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visibility" 
                    stroke="#9333ea" 
                    strokeWidth={2}
                    fill="url(#visibilityGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Keywords Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Keywords</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Top 3 Keywords */}
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <div className="text-xs text-gray-600">Top 3</div>
                    <div className="text-xl font-bold text-gray-900">{data.keywords.top3.count}</div>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-600 mb-2">
                    <span>new <span className="text-green-600">{data.keywords.top3.new}</span></span>
                    <span>lost <span className="text-red-600">{data.keywords.top3.lost}</span></span>
                  </div>
                  {/* Chart removed for simplicity - values are dynamic */}
                </div>

                {/* Top 10 Keywords */}
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <div className="text-xs text-gray-600">Top 10</div>
                    <div className="text-xl font-bold text-gray-900">{data.keywords.top10.count}</div>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-600 mb-2">
                    <span>new <span className="text-green-600">{data.keywords.top10.new}</span></span>
                    <span>lost <span className="text-red-600">{data.keywords.top10.lost}</span></span>
                  </div>
                  {/* Chart removed for simplicity - values are dynamic */}
                </div>

                {/* Top 20 Keywords */}
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <div className="text-xs text-gray-600">Top 20</div>
                    <div className="text-xl font-bold text-gray-900">{data.keywords.top20.count}</div>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-600 mb-2">
                    <span>new <span className="text-green-600">{data.keywords.top20.new}</span></span>
                    <span>lost <span className="text-red-600">{data.keywords.top20.lost}</span></span>
                  </div>
                  {/* Chart removed for simplicity - values are dynamic */}
                </div>

                {/* Top 100 Keywords */}
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <div className="text-xs text-gray-600">Top 100</div>
                    <div className="text-xl font-bold text-gray-900">{data.keywords.top100.count}</div>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-600 mb-2">
                    <span>new <span className="text-green-600">{data.keywords.top100.new}</span></span>
                    <span>lost <span className="text-red-600">{data.keywords.top100.lost}</span></span>
                  </div>
                  {/* Chart removed for simplicity - values are dynamic */}
                </div>
              </div>
            </div>

            {/* Top Keywords Table */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Top Keywords</h3>
              <div className="max-h-[280px] overflow-y-auto border border-gray-200 rounded-lg">
                <div className="space-y-1">
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 font-medium pb-2 border-b sticky top-0 bg-white z-10 px-3 pt-2">
                    <div>Keywords</div>
                    <div className="text-center">Position</div>
                    <div className="text-right">Traffic</div>
                  </div>
                  {data.topKeywords.slice(0, 100).map((keyword: any, index: number) => (
                    <div key={index} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-100 items-center px-3 hover:bg-gray-50">
                      <div className="text-xs text-blue-600 hover:underline cursor-pointer truncate" title={keyword.keyword}>
                        {keyword.keyword}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-xs">
                        <span className="font-medium text-gray-900">{keyword.position}</span>
                        {keyword.change > 0 && (
                          <span className="text-green-600 font-bold">↑</span>
                        )}
                        {keyword.change < 0 && (
                          <span className="text-red-600 font-bold">↓</span>
                        )}
                        {keyword.change === 0 && (
                          <span className="text-gray-400">−</span>
                        )}
                      </div>
                      <div className="text-right text-xs text-gray-600">{keyword.traffic}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Site Audit and On Page SEO Checker Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Site Audit Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Site Audit</h2>
            </div>
            
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-4">Site Health</div>
              <div className="flex items-center gap-8">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#E5E7EB"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#9333ea"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(data.siteHealth.score / 100) * 351.86} 351.86`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-gray-900">{data.siteHealth.score}%</div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-1">Errors</div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-2xl font-bold text-red-600">
                        {data.siteHealth.errors.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Warnings</div>
                    <div className="flex items-baseline gap-2">
                      <div className="text-2xl font-bold text-orange-600">
                        {data.siteHealth.warnings.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* On Page SEO Checker Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">On Page SEO Checker</h2>
            </div>

            <div className="flex items-center gap-8 mb-6">
              <div className="relative" style={{ width: '180px', height: '180px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={seoCheckerData.categories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="count"
                    >
                      {seoCheckerData.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-gray-900">{seoCheckerData.totalIdeas}</div>
                  <div className="text-xs text-gray-500">Ideas for {seoCheckerData.totalPages}</div>
                  <div className="text-xs text-gray-500">pages</div>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                {seoCheckerData.categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-gray-700">{category.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-3">Top Pages to Optimize</div>
              <div className="space-y-2">
                {seoCheckerData.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between text-xs py-2 border-b border-gray-100">
                    <a href={page.url} className="text-blue-600 hover:underline flex-1 truncate">
                      {page.url}
                    </a>
                    <span className="text-blue-600 font-medium ml-2">{page.ideas} ideas</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
