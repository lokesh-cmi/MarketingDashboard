import { NextRequest, NextResponse } from 'next/server';
import { fetchDetailedAnalyticsData } from '@/lib/googleAnalyticsDetailed';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET(request: NextRequest) {
  try {
    const cacheKey = 'google-analytics-detailed';
    
    // Try to get cached data first
    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      return NextResponse.json({ 
        ...cached, 
        source: 'cache' 
      });
    }

    const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

    if (!propertyId) {
      return NextResponse.json(
        { error: 'Google Analytics Property ID not configured' },
        { status: 500 }
      );
    }

    const data = await fetchDetailedAnalyticsData(propertyId);

    // Cache for 1 hour (3600 seconds)
    await setCachedData(cacheKey, data, 3600);

    return NextResponse.json({ 
      ...data, 
      source: 'database' 
    });
  } catch (error) {
    console.error('Error in Google Analytics Detailed API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Google Analytics data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
