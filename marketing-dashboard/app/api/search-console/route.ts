import { NextRequest, NextResponse } from 'next/server';
import { fetchSearchConsoleDataByDays } from '@/lib/searchConsole';
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

    // Add mock data for queries and pages (from snapshot)
    const topQueries = [
      { query: 'xebla.com', clicks: 866, impressions: 2250000, ctr: 3.4, position: 58.7 },
      { query: 'xebla careers', clicks: 289000, impressions: 683000, ctr: 2.9, position: 33.6 },
      { query: 'xebla it architects', clicks: 163000, impressions: 600000, ctr: 2.8, position: 4.3 },
      { query: 'xebla jaipur', clicks: 93000, impressions: 570000, ctr: 1.6, position: 4.1 },
      { query: 'access', clicks: 67000, impressions: 490000, ctr: 1.4, position: 3.8 },
      { query: 'xebla academy', clicks: 56000, impressions: 322000, ctr: 1.8, position: 10 },
      { query: 'xebla chennai', clicks: 54000, impressions: 237000, ctr: 2.4, position: 10.6 },
      { query: 'xebla poland', clicks: 34000, impressions: 106000, ctr: 3.2, position: 13.6 },
      { query: 'xebla company', clicks: 27000, impressions: 261000, ctr: 1.1, position: 8.6 },
      { query: 'xebla agraw', clicks: 14000, impressions: 13200, ctr: 10.9, position: 1.6 },
    ];

    const topPages = [
      { page: '/', clicks: 866, impressions: 2250000, ctr: 3.4, position: 58.7 },
      { page: '/careers/', clicks: 289000, impressions: 683000, ctr: 2.9, position: 33.6 },
      { page: '/blog/deleting-your-commit-history/', clicks: 163000, impressions: 600000, ctr: 2.8, position: 4.3 },
      { page: '/about-us/', clicks: 93000, impressions: 570000, ctr: 1.6, position: 4.1 },
      { page: '/blog/advanced/', clicks: 67000, impressions: 490000, ctr: 1.4, position: 3.8 },
      { page: '/blog/a-practical-guide-to-using-setup-py/', clicks: 56000, impressions: 322000, ctr: 1.8, position: 10 },
      { page: '/blog/how-to-use-java-records/', clicks: 54000, impressions: 237000, ctr: 2.4, position: 10.6 },
      { page: '/blog/guide-kubernetes-larn-migration/', clicks: 34000, impressions: 106000, ctr: 3.2, position: 13.6 },
      { page: '/blog/how-to-install-python-packages-from-an-internal-pypi-doge-registry-with-uv/', clicks: 27000, impressions: 261000, ctr: 1.1, position: 8.6 },
      { page: '/locations/', clicks: 26000, impressions: 74400, ctr: 3.5, position: 2.9 },
    ];

    const responseData = {
      ...data,
      topQueries,
      topPages,
    };

    // Cache for 2 hours (7200 seconds) - SEO data doesn't change as frequently
    await setCachedData(cacheKey, responseData, 7200);

    console.log(`[API /search-console] Returning ${data.dailyData.length} days of data`);

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
