import { NextResponse } from 'next/server';
import prisma from '@/lib/database/client';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET() {
  try {
    const cacheKey = 'google-ads-overview';
    
    // Try cache first
    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      return NextResponse.json({ 
        data: cached, 
        source: 'cache' 
      });
    }

    // Fetch from database
    const googleAds = await prisma.googleAds.findMany({
      orderBy: {
        date: 'desc',
      },
      take: 7,
    });

    const campaigns = await prisma.googleAdsCampaign.findMany();

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
