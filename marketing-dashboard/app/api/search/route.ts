import { NextResponse } from 'next/server';
import prisma from '@/lib/database/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    // Search in the search index
    const results = await prisma.searchIndex.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { content: { contains: query } },
        ],
      },
      take: 20,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform results
    const formattedResults = results.map((result) => ({
      id: result.id,
      type: result.type,
      title: result.title,
      metadata: result.metadata ? JSON.parse(result.metadata) : null,
    }));

    return NextResponse.json({ 
      results: formattedResults,
      count: formattedResults.length,
    });
  } catch (error) {
    console.error('Error searching:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
