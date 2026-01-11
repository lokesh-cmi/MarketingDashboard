'use client';

import React, { useState } from 'react';
import { Search, Target, Share2 } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import CategoryCard from '@/components/CategoryCard';
import GoogleAnalyticsOverview from '@/components/GoogleAnalyticsOverview';
import SearchConsoleOverview from '@/components/SearchConsoleOverview';
import HubSpotOverview from '@/components/HubSpotOverview';
import SEMrushOverview from '@/components/SEMrushOverview';
import LinkedInAdsOverview from '@/components/LinkedInAdsOverview';
import GoogleAdsOverview from '@/components/GoogleAdsOverview';
import OktopostOverview from '@/components/OktopostOverview';

type CategoryType = 'seo' | 'paid-campaigns' | 'social-media';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('seo');

  const renderOverviews = () => {
    switch (activeCategory) {
      case 'seo':
        return (
          <>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <GoogleAnalyticsOverview />
              <SearchConsoleOverview />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <HubSpotOverview />
              <SEMrushOverview />
            </div>
          </>
        );
      case 'paid-campaigns':
        return (
          <div className="grid grid-cols-2 gap-6">
            <LinkedInAdsOverview />
            <GoogleAdsOverview />
          </div>
        );
      case 'social-media':
        return (
          <div className="grid grid-cols-2 gap-6">
            <OktopostOverview />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Overview</h1>
          
          {/* Top Metrics Cards */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-5 gap-8">
              <MetricCard
                title="Total Traffic"
                value="125,430"
                change="+12.5%"
                isPositive={true}
              />
              <MetricCard
                title="Total Leads"
                value="4,250"
                change="+8.3%"
                isPositive={true}
              />
              <MetricCard
                title="Total Conversions"
                value="1,840"
                change="+15.2%"
                isPositive={true}
              />
              <MetricCard
                title="Total Spend"
                value="$42,800"
                change="-5.1%"
                isPositive={false}
              />
              <MetricCard
                title="Overall Conversion Rate"
                value="3.68%"
                change="+2.1%"
                isPositive={true}
              />
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <CategoryCard
              icon={<Search className="w-6 h-6" />}
              title="SEO"
              description="Organic traffic & search performance"
              isActive={activeCategory === 'seo'}
              onClick={() => setActiveCategory('seo')}
            />
            <CategoryCard
              icon={<Target className="w-6 h-6" />}
              title="Paid Campaigns"
              description="Google Ads & paid acquisition"
              isActive={activeCategory === 'paid-campaigns'}
              onClick={() => setActiveCategory('paid-campaigns')}
            />
            <CategoryCard
              icon={<Share2 className="w-6 h-6" />}
              title="Social Media"
              description="Organic & paid social performance"
              isActive={activeCategory === 'social-media'}
              onClick={() => setActiveCategory('social-media')}
            />
          </div>
        </div>

        {/* Dynamic Overview Section */}
        {renderOverviews()}
      </div>
    </div>
  );
}
