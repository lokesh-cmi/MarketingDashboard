import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/database/client';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    console.log(`[API /oktopost] Request for ${days} days`);

    const cacheKey = `oktopost-overview-${days}`;

    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      console.log(`[API /oktopost] Returning cached data for ${days} days`);
      return NextResponse.json({ ...cached, source: 'cache' });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Fetch social media data for all platforms
    const socialMedia = await prisma.oktopostSocialMedia.findMany({
      where: {
        date: {
          gte: startDate,
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    console.log(`[API /oktopost] Found ${socialMedia.length} social media records`);

    // Group by platform
    const platforms = ['LinkedIn', 'Instagram', 'Facebook', 'Twitter'];
    const platformData = platforms.map(platform => {
      const records = socialMedia.filter(r => r.platform === platform);
      
      // Calculate total metrics
      const latestRecord = records[0] || {
        followers: 0,
        impressions: 0,
        engagement: 0,
        clicks: 0,
        shares: 0,
        likes: 0,
        comments: 0,
        saves: 0,
        reach: 0,
        reactions: 0,
        retweets: 0,
      };

      // Calculate percentage change (comparing first vs last day)
      const firstRecord = records[records.length - 1] || latestRecord;
      const calculateChange = (latest: number, first: number) => {
        if (first === 0) return 0;
        return ((latest - first) / first) * 100;
      };

      // Format data for charts (showing trend over time)
      const chartData = records.slice(0, Math.min(30, days)).reverse().map(r => ({
        date: new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        followers: r.followers,
        impressions: r.impressions || 0,
        engagement: r.engagement || 0,
        clicks: r.clicks || 0,
      }));

      return {
        platform,
        metrics: {
          followers: {
            value: latestRecord.followers,
            change: calculateChange(latestRecord.followers, firstRecord.followers),
          },
          impressions: {
            value: latestRecord.impressions || 0,
            change: calculateChange(latestRecord.impressions || 0, firstRecord.impressions || 0),
          },
          engagement: {
            value: latestRecord.engagement || 0,
            change: calculateChange(latestRecord.engagement || 0, firstRecord.engagement || 0),
          },
          clicks: {
            value: latestRecord.clicks || 0,
            change: calculateChange(latestRecord.clicks || 0, firstRecord.clicks || 0),
          },
          shares: {
            value: latestRecord.shares || 0,
            change: calculateChange(latestRecord.shares || 0, firstRecord.shares || 0),
          },
          likes: {
            value: latestRecord.likes || 0,
            change: calculateChange(latestRecord.likes || 0, firstRecord.likes || 0),
          },
          comments: {
            value: latestRecord.comments || 0,
            change: calculateChange(latestRecord.comments || 0, firstRecord.comments || 0),
          },
          saves: {
            value: latestRecord.saves || 0,
            change: calculateChange(latestRecord.saves || 0, firstRecord.saves || 0),
          },
          reach: {
            value: latestRecord.reach || 0,
            change: calculateChange(latestRecord.reach || 0, firstRecord.reach || 0),
          },
          reactions: {
            value: latestRecord.reactions || 0,
            change: calculateChange(latestRecord.reactions || 0, firstRecord.reactions || 0),
          },
          retweets: {
            value: latestRecord.retweets || 0,
            change: calculateChange(latestRecord.retweets || 0, firstRecord.retweets || 0),
          },
        },
        chartData,
      };
    });

    const response = {
      platforms: platformData,
      source: 'database',
    };

    await setCachedData(cacheKey, response, 3600); // Cache for 1 hour

    return NextResponse.json(response);
  } catch (error) {
    console.error('[API /oktopost] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Oktopost data' },
      { status: 500 }
    );
  }
}
