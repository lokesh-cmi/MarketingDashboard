import { NextRequest, NextResponse } from 'next/server';
import { fetchSearchConsoleDataByDays, fetchTopQueries, fetchTopPages } from '@/lib/searchConsole';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    
    console.log(`[API /search-console] Request for ${days} days`);
    
    const cacheKey = `search-console-data-${days}`;
    
    // Try to get cached data first
    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      console.log(`[API /search-console] Returning cached data for ${days} days`);
      return NextResponse.json({ 
        ...cached, 
        source: 'cache' 
      });
    }

    console.log(`[API /search-console] Cache miss, fetching from Google API`);

    // Get the site URL from environment variable
    const siteUrl = process.env.GSC_SITE_URL;

    if (!siteUrl) {
      return NextResponse.json(
        { error: 'Google Search Console Site URL not configured' },
        { status: 500 }
      );
    }

    // Fetch the search console data for specified days
    const data = await fetchSearchConsoleDataByDays(siteUrl, days);
    
    // Fetch real queries and pages data
    const topQueries = await fetchTopQueries(siteUrl, days, 10);
    const topPages = await fetchTopPages(siteUrl, days, 10);

    const responseData = {
      ...data,
      topQueries,
      topPages,
    };

    // Cache for 2 hours (7200 seconds) - SEO data doesn't change as frequently
    await setCachedData(cacheKey, responseData, 7200);

    console.log(`[API /search-console] Returning ${data.dailyData.length} days of data with ${topQueries.length} queries and ${topPages.length} pages`);

    return NextResponse.json({ 
      ...responseData, 
      source: 'google-api' 
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
