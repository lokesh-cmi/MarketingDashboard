'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Target, Share2 } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import CategoryCard from '@/components/CategoryCard';
import GoogleAnalyticsOverview from '@/components/GoogleAnalyticsOverview';
import SearchConsoleOverview from '@/components/SearchConsoleOverview';
import HubSpotOverview from '@/components/HubSpotOverview';
import SEMrushOverview from '@/components/SEMrushOverview';
import LinkedInAdsOverview from '@/components/LinkedInAdsOverview';
import GoogleAdsOverview from '@/components/GoogleAdsOverview';
import LinkedInPerformance from '@/components/LinkedInPerformance';
import InstagramPerformance from '@/components/InstagramPerformance';
import FacebookPerformance from '@/components/FacebookPerformance';
import TwitterPerformance from '@/components/TwitterPerformance';
import DraggableTile from '@/components/DraggableTile';
import { useDateRange } from '@/contexts/DateRangeContext';
import { getTileConfig, reorderTiles, toggleTilePin, Category, TileConfig } from '@/lib/tile-order';

type CategoryType = 'seo' | 'paid-campaigns' | 'social-media';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<CategoryType>('seo');
  const { dateRange, getDateRangeInDays } = useDateRange();
  const [metrics, setMetrics] = useState<any>(null);
  const [metricsLoading, setMetricsLoading] = useState(true);
  
  // Drag and drop state
  const [tiles, setTiles] = useState<TileConfig[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // Component mapping
  const componentMap: Record<string, React.ComponentType> = {
    GoogleAnalyticsOverview,
    SearchConsoleOverview,
    HubSpotOverview,
    SEMrushOverview,
    LinkedInAdsOverview,
    GoogleAdsOverview,
    LinkedInPerformance,
    InstagramPerformance,
    FacebookPerformance,
    TwitterPerformance,
  };

  // Load tiles when category changes
  useEffect(() => {
    const tileConfig = getTileConfig(activeCategory as Category);
    setTiles(tileConfig);
  }, [activeCategory]);

  // Fetch overview metrics
  useEffect(() => {
    async function fetchMetrics() {
      try {
        setMetricsLoading(true);
        const days = getDateRangeInDays();
        console.log(`[HomePage] Fetching metrics for ${dateRange} (${days} days)`);
        const response = await fetch(`/api/overview-metrics?days=${days}`);
        if (!response.ok) throw new Error('Failed to fetch overview metrics');
        const data = await response.json();
        console.log(`[HomePage] Metrics source: ${data.source}`);
        setMetrics(data);
      } catch (err) {
        console.error('Error fetching overview metrics:', err);
      } finally {
        setMetricsLoading(false);
      }
    }
    fetchMetrics();
  }, [dateRange, getDateRangeInDays]);

  // Read category from URL on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category') as CategoryType;
    if (categoryParam && ['seo', 'paid-campaigns', 'social-media'].includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  // Update URL when category changes
  const handleCategoryChange = (category: CategoryType) => {
    setActiveCategory(category);
    router.push(`/?category=${category}`);
  };

  // Drag and drop handlers
  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragOver = (id: string) => {
    if (draggedId && draggedId !== id) {
      setDragOverId(id);
    }
  };

  const handleDrop = (draggedId: string, targetId: string) => {
    if (draggedId !== targetId) {
      const newTiles = reorderTiles(activeCategory as Category, draggedId, targetId);
      setTiles(newTiles);
    }
    setDraggedId(null);
    setDragOverId(null);
  };

  const handlePinToggle = (id: string) => {
    const newTiles = toggleTilePin(activeCategory as Category, id);
    setTiles(newTiles);
  };

  const renderOverviews = () => {
    return (
      <div className="grid grid-cols-2 gap-6">
        {tiles.map((tile) => {
          const Component = componentMap[tile.component];
          if (!Component) return null;

          return (
            <DraggableTile
              key={tile.id}
              id={tile.id}
              isPinned={tile.isPinned}
              onPinToggle={handlePinToggle}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              isDragging={draggedId === tile.id}
              dragOverId={dragOverId}
            >
              <Component />
            </DraggableTile>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Overview</h1>
          
          {/* Top Metrics Cards */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            {metricsLoading ? (
              <div className="grid grid-cols-5 gap-8 animate-pulse">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            ) : metrics ? (
              <div className="grid grid-cols-5 gap-8">
                <MetricCard
                  title="Total Traffic"
                  value={(metrics.totalTraffic?.value || 0).toLocaleString()}
                  change={`${(metrics.totalTraffic?.change || 0) >= 0 ? '+' : ''}${(metrics.totalTraffic?.change || 0).toFixed(1)}%`}
                  isPositive={(metrics.totalTraffic?.change || 0) >= 0}
                />
                <MetricCard
                  title="Total Leads"
                  value={(metrics.totalLeads?.value || 0).toLocaleString()}
                  change={`${(metrics.totalLeads?.change || 0) >= 0 ? '+' : ''}${(metrics.totalLeads?.change || 0).toFixed(1)}%`}
                  isPositive={(metrics.totalLeads?.change || 0) >= 0}
                />
                <MetricCard
                  title="Total Conversions"
                  value={(metrics.totalConversions?.value || 0).toLocaleString()}
                  change={`${(metrics.totalConversions?.change || 0) >= 0 ? '+' : ''}${(metrics.totalConversions?.change || 0).toFixed(1)}%`}
                  isPositive={(metrics.totalConversions?.change || 0) >= 0}
                />
                <MetricCard
                  title="Total Spend"
                  value={`$${(metrics.totalSpend?.value || 0).toLocaleString()}`}
                  change={`${(metrics.totalSpend?.change || 0) >= 0 ? '+' : ''}${(metrics.totalSpend?.change || 0).toFixed(1)}%`}
                  isPositive={(metrics.totalSpend?.change || 0) < 0}
                />
                <MetricCard
                  title="Overall Conversion Rate"
                  value={`${(metrics.conversionRate?.value || 0).toFixed(2)}%`}
                  change={`${(metrics.conversionRate?.change || 0) >= 0 ? '+' : ''}${(metrics.conversionRate?.change || 0).toFixed(1)}%`}
                  isPositive={(metrics.conversionRate?.change || 0) >= 0}
                />
              </div>
            ) : (
              <div className="text-center text-gray-500">Failed to load metrics</div>
            )}
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <CategoryCard
              icon={<Search className="w-6 h-6" />}
              title="SEO"
              description="Organic traffic & search performance"
              isActive={activeCategory === 'seo'}
              onClick={() => handleCategoryChange('seo')}
            />
            <CategoryCard
              icon={<Target className="w-6 h-6" />}
              title="Paid Campaigns"
              description="Google Ads & paid acquisition"
              isActive={activeCategory === 'paid-campaigns'}
              onClick={() => handleCategoryChange('paid-campaigns')}
            />
            <CategoryCard
              icon={<Share2 className="w-6 h-6" />}
              title="Social Media"
              description="Organic & paid social performance"
              isActive={activeCategory === 'social-media'}
              onClick={() => handleCategoryChange('social-media')}
            />
          </div>
        </div>

        {/* Dynamic Overview Section */}
        {renderOverviews()}
      </div>
    </div>
  );
}
