import { NextResponse } from 'next/server';
import prisma from '@/lib/database/client';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');
    
    console.log(`[API /google-ads] Request for ${days} days`);
    
    const cacheKey = `google-ads-overview-${days}`;
    
    // Try cache first
    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      console.log(`[API /google-ads] Returning cached data for ${days} days`);
      return NextResponse.json({ 
        data: cached, 
        source: 'cache' 
      });
    }

    console.log(`[API /google-ads] Cache miss, fetching from database`);

    // Calculate start date
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Fetch from database with date filter
    const googleAds = await prisma.googleAds.findMany({
      where: {
        date: {
          gte: startDate,
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: days,
    });

    const campaigns = await prisma.googleAdsCampaign.findMany();

    console.log(`[API /google-ads] Found ${googleAds.length} days of data`);

    // Transform data
    const chartData = googleAds.reverse().map((item) => ({
      date: item.date.toISOString().split('T')[0],
      clicks: item.clicks,
      cost: item.cost,
      conversions: item.conversions,
    }));

    const response = {
      chartData,
      campaigns,
      summary: {
        totalClicks: googleAds.reduce((sum, item) => sum + item.clicks, 0),
        totalCost: googleAds.reduce((sum, item) => sum + item.cost, 0),
        totalConversions: googleAds.reduce((sum, item) => sum + item.conversions, 0),
      },
    };

    // Cache for 1 hour
    await setCachedData(cacheKey, response, 3600);

    return NextResponse.json({ 
      data: response, 
      source: 'database' 
    });
  } catch (error) {
    console.error('Error fetching Google Ads data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Google Ads data' },
      { status: 500 }
    );
  }
}
