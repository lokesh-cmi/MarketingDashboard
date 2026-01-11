import { NextRequest, NextResponse } from 'next/server';
import { fetchSearchConsoleMonthlyData } from '@/lib/searchConsole';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET(request: NextRequest) {
  try {
    const cacheKey = 'search-console-data';
    
    // Try to get cached data first
    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      return NextResponse.json({ 
        ...cached, 
        source: 'cache' 
      });
    }

    // Get the site URL from environment variable
    const siteUrl = process.env.GSC_SITE_URL;

    if (!siteUrl) {
      return NextResponse.json(
        { error: 'Google Search Console Site URL not configured' },
        { status: 500 }
      );
    }

    // Fetch the search console data (last 6 months, monthly aggregation)
    const data = await fetchSearchConsoleMonthlyData(siteUrl);

    // Cache for 2 hours (7200 seconds) - SEO data doesn't change as frequently
    await setCachedData(cacheKey, data, 7200);

    return NextResponse.json({ 
      ...data, 
      source: 'database' 
    });
  } catch (error) {
    console.error('Error in Search Console API route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch Search Console data', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
