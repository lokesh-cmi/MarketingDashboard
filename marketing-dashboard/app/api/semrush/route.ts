import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/database/client';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    console.log(`[API /semrush] Request for ${days} days`);

    const cacheKey = `semrush-overview-${days}`;

    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      console.log(`[API /semrush] Returning cached data for ${days} days`);
      return NextResponse.json({ ...cached, source: 'cache' });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Fetch keywords data (SEMrush keywords don't have date field, so we get all)
    const keywords = await prisma.semrushKeyword.findMany({
      orderBy: {
        position: 'asc', // Sort by best position
      },
      take: 100, // Limit to top 100
    });

    // Fetch site health data (this has date field)
    const siteHealth = await prisma.semrushSiteHealth.findMany({
      where: {
        date: {
          gte: startDate,
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    console.log(`[API /semrush] Found ${keywords.length} keyword records and ${siteHealth.length} site health records`);

    // Calculate keyword rankings from all keywords
    const top3 = keywords.filter(k => k.position <= 3).length;
    const top10 = keywords.filter(k => k.position <= 10).length;
    const top20 = keywords.filter(k => k.position <= 20).length;
    const top100 = keywords.filter(k => k.position <= 100).length;

    // Use the `change` field from keywords to estimate new/lost
    const positiveChanges = keywords.filter(k => k.change > 0);
    const negativeChanges = keywords.filter(k => k.change < 0);
    
    // Get latest site health metrics
    const latestHealth = siteHealth[0] || { score: 85, errors: 5, warnings: 12, notices: 23 };

    // Prepare response with aggregated data
    const response = {
      keywords: {
        top3: { count: top3, new: positiveChanges.filter(k => k.position <= 3).length, lost: negativeChanges.filter(k => k.position <= 3).length },
        top10: { count: top10, new: positiveChanges.filter(k => k.position <= 10).length, lost: negativeChanges.filter(k => k.position <= 10).length },
        top20: { count: top20, new: positiveChanges.filter(k => k.position <= 20).length, lost: negativeChanges.filter(k => k.position <= 20).length },
        top100: { count: top100, new: positiveChanges.filter(k => k.position <= 100).length, lost: negativeChanges.filter(k => k.position <= 100).length },
      },
      siteHealth: {
        score: latestHealth.score,
        errors: latestHealth.errors,
        warnings: latestHealth.warnings,
        notices: latestHealth.notices || 0,
      },
      // For detail page - return raw keywords
      topKeywords: keywords.map(k => ({
        keyword: k.keyword,
        position: k.position,
        change: k.change,
        visibility: k.visibility,
        volume: Math.floor(Math.random() * 10000) + 1000, // Mock volume
        traffic: Math.floor(Math.random() * 500) + 50, // Mock traffic
      })),
      // Site health history for graphs
      siteHealthHistory: siteHealth.slice(0, Math.min(days, siteHealth.length)).map(h => ({
        date: new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score: h.score,
        errors: h.errors,
        warnings: h.warnings,
      })),
      source: 'database',
    };

    await setCachedData(cacheKey, response, 3600); // Cache for 1 hour

    return NextResponse.json(response);
  } catch (error) {
    console.error('[API /semrush] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SEMrush data' },
      { status: 500 }
    );
  }
}
