import { NextRequest, NextResponse } from 'next/server';
import { fetchGoogleAnalyticsData } from '@/lib/googleAnalytics';

export async function GET(request: NextRequest) {
  try {
    // Get the property ID from environment variable
    const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

    if (!propertyId) {
      return NextResponse.json(
        { error: 'Google Analytics Property ID not configured' },
        { status: 500 }
      );
    }

    // Fetch the analytics data
    const data = await fetchGoogleAnalyticsData(propertyId);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Google Analytics API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Google Analytics data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
