import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/database/client';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    console.log(`[API /overview-metrics] Request for ${days} days`);

    const cacheKey = `overview-metrics-${days}`;

    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      console.log(`[API /overview-metrics] Returning cached data for ${days} days`);
      return NextResponse.json({ ...cached, source: 'cache' });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Calculate previous period for comparison
    const prevStartDate = new Date(startDate);
    prevStartDate.setDate(prevStartDate.getDate() - days);

    // Fetch data from different sources
    
    // 1. Traffic (from Google Ads + LinkedIn Ads)
    const currentAdsData = await prisma.googleAds.findMany({
      where: { date: { gte: startDate } },
    });
    const prevAdsData = await prisma.googleAds.findMany({
      where: { date: { gte: prevStartDate, lt: startDate } },
    });
    
    const currentLinkedInData = await prisma.linkedInAds.findMany({
      where: { date: { gte: startDate } },
    });
    const prevLinkedInData = await prisma.linkedInAds.findMany({
      where: { date: { gte: prevStartDate, lt: startDate } },
    });

    const currentTraffic = 
      currentAdsData.reduce((sum, r) => sum + (r.clicks || 0), 0) +
      currentLinkedInData.reduce((sum, r) => sum + (r.clicks || 0), 0);
    
    const prevTraffic = 
      prevAdsData.reduce((sum, r) => sum + (r.clicks || 0), 0) +
      prevLinkedInData.reduce((sum, r) => sum + (r.clicks || 0), 0);

    const trafficChange = prevTraffic > 0 ? ((currentTraffic - prevTraffic) / prevTraffic) * 100 : 0;

    // 2. Leads (from Google Ads + LinkedIn Ads conversions)
    const currentLeads = 
      currentAdsData.reduce((sum, r) => sum + (r.conversions || 0), 0) +
      currentLinkedInData.reduce((sum, r) => sum + (r.conversions || 0), 0);
    
    const prevLeads = 
      prevAdsData.reduce((sum, r) => sum + (r.conversions || 0), 0) +
      prevLinkedInData.reduce((sum, r) => sum + (r.conversions || 0), 0);

    const leadsChange = prevLeads > 0 ? ((currentLeads - prevLeads) / prevLeads) * 100 : 0;

    // 3. Conversions (from HubSpot deals)
    const currentDeals = await prisma.hubSpotDeals.findMany({
      where: { date: { gte: startDate } },
    });
    const prevDeals = await prisma.hubSpotDeals.findMany({
      where: { date: { gte: prevStartDate, lt: startDate } },
    });

    const currentConversions = currentDeals.reduce((sum, r) => sum + r.count, 0);
    const prevConversions = prevDeals.reduce((sum, r) => sum + r.count, 0);
    const conversionsChange = prevConversions > 0 ? ((currentConversions - prevConversions) / prevConversions) * 100 : 0;

    // 4. Spend (from Google Ads + LinkedIn Ads)
    const currentSpend = 
      currentAdsData.reduce((sum, r) => sum + r.cost, 0) +
      currentLinkedInData.reduce((sum, r) => sum + r.spend, 0);
    
    const prevSpend = 
      prevAdsData.reduce((sum, r) => sum + r.cost, 0) +
      prevLinkedInData.reduce((sum, r) => sum + r.spend, 0);

    const spendChange = prevSpend > 0 ? ((currentSpend - prevSpend) / prevSpend) * 100 : 0;

    // 5. Conversion Rate
    const currentConversionRate = currentTraffic > 0 ? (currentLeads / currentTraffic) * 100 : 0;
    const prevConversionRate = prevTraffic > 0 ? (prevLeads / prevTraffic) * 100 : 0;
    const conversionRateChange = prevConversionRate > 0 ? ((currentConversionRate - prevConversionRate) / prevConversionRate) * 100 : 0;

    const response = {
      totalTraffic: {
        value: currentTraffic,
        change: trafficChange,
      },
      totalLeads: {
        value: currentLeads,
        change: leadsChange,
      },
      totalConversions: {
        value: currentConversions,
        change: conversionsChange,
      },
      totalSpend: {
        value: currentSpend,
        change: spendChange,
      },
      conversionRate: {
        value: currentConversionRate,
        change: conversionRateChange,
      },
      source: 'database',
    };

    await setCachedData(cacheKey, response, 3600); // Cache for 1 hour

    return NextResponse.json(response);
  } catch (error) {
    console.error('[API /overview-metrics] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch overview metrics' },
      { status: 500 }
    );
  }
}
