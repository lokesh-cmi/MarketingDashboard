import { NextResponse } from 'next/server';
import prisma from '@/lib/database/client';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    
    console.log(`[API /linkedin-ads] Request for ${days} days`);
    
    const cacheKey = `linkedin-ads-overview-${days}`;
    
    // Try to get cached data first
    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      console.log(`[API /linkedin-ads] Returning cached data for ${days} days`);
      return NextResponse.json({ 
        data: cached, 
        source: 'cache' 
      });
    }

    console.log(`[API /linkedin-ads] Cache miss, fetching from database`);

    // Calculate start date
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    console.log(`[API /linkedin-ads] Filtering from ${startDate.toISOString()}`);

    // Fetch from database with date filter
    const linkedInAds = await prisma.linkedInAds.findMany({
      where: {
        date: {
          gte: startDate,
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: days, // Last X days
    });
    
    console.log(`[API /linkedin-ads] Found ${linkedInAds.length} records`);

    // Transform data for chart
    const chartData = linkedInAds.reverse().map((item) => ({
      day: new Date(item.date).getDate().toString(),
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
        totalSpend,
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
