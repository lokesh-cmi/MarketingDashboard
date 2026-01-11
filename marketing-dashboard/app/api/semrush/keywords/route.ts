import { NextResponse } from 'next/server';
import prisma from '@/lib/database/client';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET() {
  try {
    const cacheKey = 'semrush-keywords';
    
    // Try to get cached data
    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      return NextResponse.json({ 
        keywords: cached, 
        source: 'cache' 
      });
    }

    // Fetch from database
    const keywords = await prisma.semrushKeyword.findMany({
      orderBy: {
        position: 'asc', // Best positions first
      },
    });

    // Cache for 6 hours (SEMrush data doesn't change frequently)
    await setCachedData(cacheKey, keywords, 21600);

    return NextResponse.json({ 
      keywords, 
      source: 'database',
      count: keywords.length,
    });
  } catch (error) {
    console.error('Error fetching SEMrush keywords:', error);
    return NextResponse.json(
      { error: 'Failed to fetch keywords' },
      { status: 500 }
    );
  }
}
