import { NextResponse } from 'next/server';
import prisma from '@/lib/database/client';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET() {
  try {
    const cacheKey = 'linkedin-ads-overview';
    
    // Try to get cached data first
    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      return NextResponse.json({ 
        data: cached, 
        source: 'cache' 
      });
    }

    // Fetch from database
    const linkedInAds = await prisma.linkedInAds.findMany({
      orderBy: {
        date: 'desc',
      },
      take: 30, // Last 30 days
    });

    // Transform data for chart
    const chartData = linkedInAds.reverse().map((item) => ({
      day: item.date.toISOString().split('T')[0],
      clicks: item.clicks,
      conversions: item.conversions,
      spend: item.spend,
      impressions: item.impressions,
    }));

    // Calculate summary metrics
    const totalClicks = linkedInAds.reduce((sum, item) => sum + item.clicks, 0);
    const totalConversions = linkedInAds.reduce((sum, item) => sum + item.conversions, 0);
    const totalSpend = linkedInAds.reduce((sum, item) => sum + item.spend, 0);
    const totalImpressions = linkedInAds.reduce((sum, item) => sum + item.impressions, 0);

    const response = {
      chartData,
      summary: {
        totalClicks,
        totalConversions,
        totalSpend: totalSpend.toFixed(2),
        totalImpressions,
        averageCTR: ((totalClicks / totalImpressions) * 100).toFixed(2),
        conversionRate: ((totalConversions / totalClicks) * 100).toFixed(2),
      },
    };

    // Cache for 1 hour (3600 seconds)
    await setCachedData(cacheKey, response, 3600);

    return NextResponse.json({ 
      data: response, 
      source: 'database' 
    });
  } catch (error) {
    console.error('Error fetching LinkedIn Ads data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch LinkedIn Ads data' },
      { status: 500 }
    );
  }
}
