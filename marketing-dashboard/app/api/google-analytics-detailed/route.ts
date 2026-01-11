import { NextRequest, NextResponse } from 'next/server';
import { fetchDetailedAnalyticsData } from '@/lib/googleAnalyticsDetailed';

export async function GET(request: NextRequest) {
  try {
    const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

    if (!propertyId) {
      return NextResponse.json(
        { error: 'Google Analytics Property ID not configured' },
        { status: 500 }
      );
    }

    const data = await fetchDetailedAnalyticsData(propertyId);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Google Analytics Detailed API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Google Analytics data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
