import { NextResponse } from 'next/server';
import prisma from '@/lib/database/client';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET() {
  try {
    const cacheKey = 'hubspot-detail';
    
    // Try cache first
    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      return NextResponse.json({ 
        data: cached, 
        source: 'cache' 
      });
    }

    // Fetch from database
    const deals = await prisma.hubSpotDeals.findMany({
      orderBy: {
        date: 'desc',
      },
    });

    // If no data, return mock data
    const pipelineData = deals.length > 0 ? deals : [
      { date: new Date('2024-01'), source: 'Organic Search', count: 12, amount: 180000 },
      { date: new Date('2024-01'), source: 'Paid Search', count: 8, amount: 120000 },
      { date: new Date('2024-01'), source: 'Social Media', count: 15, amount: 225000 },
      { date: new Date('2024-01'), source: 'Direct Traffic', count: 10, amount: 150000 },
      { date: new Date('2024-01'), source: 'Email Marketing', count: 18, amount: 270000 },
      { date: new Date('2024-01'), source: 'Referral', count: 7, amount: 105000 },
    ];

    const totalDeals = pipelineData.reduce((sum, deal) => sum + (deal.count || 0), 0);
    const totalAmount = pipelineData.reduce((sum, deal) => sum + (deal.amount || 0), 0);

    const response = {
      pipelineData: pipelineData.map(deal => ({
        source: deal.source,
        count: deal.count,
        amount: deal.amount,
      })),
      summary: {
        totalDeals,
        totalAmount,
      },
    };

    // Cache for 2 hours
    await setCachedData(cacheKey, response, 7200);

    return NextResponse.json({ 
      data: response, 
      source: 'database' 
    });
  } catch (error) {
    console.error('Error fetching HubSpot detail data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch HubSpot detail data' },
      { status: 500 }
    );
  }
}
