import { NextRequest, NextResponse } from 'next/server';
import { fetchSearchConsoleMonthlyData } from '@/lib/searchConsole';

export async function GET(request: NextRequest) {
  try {
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

    return NextResponse.json(data);
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
