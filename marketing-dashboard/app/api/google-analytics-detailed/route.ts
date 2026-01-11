import { NextRequest, NextResponse } from 'next/server';
import { fetchDetailedAnalyticsDataByDays } from '@/lib/googleAnalyticsDetailed';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    
    console.log(`[API /google-analytics-detailed] Request for ${days} days`);
    
    const cacheKey = `google-analytics-detailed-${days}`;

    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      console.log(`[API /google-analytics-detailed] Returning cached data for ${days} days`);
      return NextResponse.json({ ...cached, source: 'cache' });
    }

    console.log(`[API /google-analytics-detailed] Cache miss, fetching from Google API`);

    const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

    if (!propertyId) {
      return NextResponse.json(
        { error: 'Google Analytics Property ID not configured' },
        { status: 500 }
      );
    }

    const data = await fetchDetailedAnalyticsDataByDays(propertyId, days);

    await setCachedData(cacheKey, data, 3600); // Cache for 1 hour

    return NextResponse.json({ ...data, source: 'google-api' });
  } catch (error) {
    console.error('Error in Google Analytics Detailed API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Google Analytics data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
