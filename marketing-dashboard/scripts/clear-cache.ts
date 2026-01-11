import prisma from '../lib/database/client';

async function clearCache() {
  try {
    console.log('Clearing cache...');
    const result = await prisma.cache.deleteMany({});
    console.log(`Cleared ${result.count} cache entries`);
    process.exit(0);
  } catch (error) {
    console.error('Error clearing cache:', error);
    process.exit(1);
  }
}

clearCache();
