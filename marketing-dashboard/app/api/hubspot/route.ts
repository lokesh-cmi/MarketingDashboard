import { NextResponse } from 'next/server';
import prisma from '@/lib/database/client';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    
    console.log(`[API /hubspot] Request for ${days} days`);
    
    const cacheKey = `hubspot-overview-${days}`;
    
    // Try cache first
    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      console.log(`[API /hubspot] Returning cached data for ${days} days`);
      return NextResponse.json(cached);
    }

    console.log(`[API /hubspot] Cache miss, fetching from database`);

    // Fetch from database (HubSpot data is not date-filtered in this simple implementation)
    const contacts = await prisma.hubSpotContact.findMany();
    const deals = await prisma.hubSpotDeals.findMany({
      orderBy: {
        date: 'desc',
      },
    });

    // Transform data for overview
    const contactBreakdown = contacts.length > 0 ? contacts.map(c => ({
      stage: c.stage,
      digital: Math.floor(c.count * 0.7),
      events: Math.floor(c.count * 0.3),
    })) : [];

    const totalDeals = deals.reduce((sum, d) => sum + d.count, 0);
    const totalAmount = deals.reduce((sum, d) => sum + d.amount, 0);

    const response = {
      dealsMetrics: {
        totalDeals,
        totalAmount: `€${(totalAmount / 1000000).toFixed(1)}M`,
      },
      contactLifecycleData: contactBreakdown,
      source: 'database'
    };

    // Cache for 2 hours
    await setCachedData(cacheKey, response, 7200);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching HubSpot data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch HubSpot data' },
      { status: 500 }
    );
  }
}
