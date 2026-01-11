import prisma from './client';

/**
 * Get cached data by key
 * Returns null if cache miss or expired
 */
export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const cached = await prisma.cache.findUnique({
      where: { key },
    });

    if (!cached) {
      return null;
    }

    // Check if expired
    if (new Date(cached.expiresAt) < new Date()) {
      // Delete expired cache
      await prisma.cache.delete({ where: { key } });
      return null;
    }

    return JSON.parse(cached.value) as T;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

/**
 * Set cached data with TTL (time to live) in seconds
 * Default: 24 hours (86400 seconds)
 */
export async function setCachedData(
  key: string,
  value: any,
  ttlSeconds: number = 86400
): Promise<void> {
  try {
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
    
    await prisma.cache.upsert({
      where: { key },
      update: {
        value: JSON.stringify(value),
        expiresAt,
        updatedAt: new Date(),
      },
      create: {
        key,
        value: JSON.stringify(value),
        expiresAt,
      },
    });
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

/**
 * Delete cached data by key
 */
export async function deleteCachedData(key: string): Promise<void> {
  try {
    await prisma.cache.delete({ where: { key } });
  } catch (error) {
    console.error('Cache delete error:', error);
  }
}

/**
 * Clear all expired cache entries
 */
export async function clearExpiredCache(): Promise<number> {
  try {
    const result = await prisma.cache.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    return result.count;
  } catch (error) {
    console.error('Clear expired cache error:', error);
    return 0;
  }
}

/**
 * Clear all cache
 */
export async function clearAllCache(): Promise<void> {
  try {
    await prisma.cache.deleteMany();
  } catch (error) {
    console.error('Clear all cache error:', error);
  }
}
