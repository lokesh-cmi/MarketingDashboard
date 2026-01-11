# Database Infrastructure Setup

This document describes the database infrastructure for the Marketing Dashboard, which uses **SQLite** with **Prisma ORM** for data persistence and caching.

## 🗄️ Database Overview

The Marketing Dashboard uses **SQLite** as its database - a free, serverless, zero-configuration database that requires no external service or infrastructure. Perfect for development and small to medium deployments!

### Key Features

- **Free Tier**: SQLite is completely free and requires no external services
- **Zero Configuration**: No database server setup required
- **Type-Safe**: Prisma provides full TypeScript type safety
- **Caching**: Built-in caching layer for API responses
- **Search**: Full-text search capabilities
- **Migrations**: Version-controlled database schema changes

## 📊 Database Schema

The database includes the following tables:

### Analytics Data

- **GoogleAnalytics**: Stores Google Analytics metrics (sessions, users, page views, engagement rate)
- **SearchConsole**: Stores Google Search Console data (impressions, clicks, CTR, position)

### SEMrush Data

- **SemrushKeyword**: Keyword tracking data with positions and visibility
- **SemrushSiteHealth**: Site health scores, errors, warnings, and notices

### Advertising Data

- **LinkedInAds**: LinkedIn advertising metrics (clicks, spend, impressions, conversions)
- **GoogleAds**: Google Ads performance data (clicks, cost, conversions)
- **GoogleAdsCampaign**: Detailed campaign information and metrics

### CRM Data

- **HubSpotContact**: Contact lifecycle stage data
- **HubSpotDeals**: Deals pipeline and revenue data

### Social Media Data

- **OktopostSocialMedia**: Multi-platform social media analytics (LinkedIn, Instagram, Facebook, Twitter)

### System Tables

- **Cache**: Caching layer for API responses with TTL
- **SearchIndex**: Full-text search index for keywords and campaigns

## 🚀 Getting Started

### 1. Database is Already Set Up!

The database has been initialized and is ready to use. The SQLite database file is located at:

```
/dev.db
```

### 2. Database Scripts

The following npm scripts are available:

```bash
# Seed the database with mock data
npm run db:seed

# Run database migrations
npm run db:migrate

# Open Prisma Studio (visual database browser)
npm run db:studio

# Regenerate Prisma Client
npm run db:generate
```

### 3. Viewing Your Data

To browse your database visually, run:

```bash
npm run db:studio
```

This will open Prisma Studio in your browser at `http://localhost:5555` where you can:
- View all tables and data
- Edit records
- Run queries
- Export data

## 💾 Using the Database in Your Code

### Basic Usage

```typescript
import prisma from '@/lib/database/client';

// Fetch LinkedIn Ads data
const linkedInAds = await prisma.linkedInAds.findMany({
  where: {
    date: {
      gte: new Date('2024-01-01'),
    },
  },
  orderBy: {
    date: 'desc',
  },
});

// Create a new SEMrush keyword
await prisma.semrushKeyword.create({
  data: {
    keyword: 'marketing automation',
    position: 5,
    change: -2,
    visibility: '0.45%',
  },
});
```

### Using the Cache

The built-in caching layer helps reduce API calls:

```typescript
import { getCachedData, setCachedData } from '@/lib/database/cache';

// Try to get cached data
const cachedData = await getCachedData<MyDataType>('my-cache-key');

if (cachedData) {
  return cachedData;
}

// Fetch fresh data
const freshData = await fetchFromAPI();

// Cache for 1 hour (3600 seconds)
await setCachedData('my-cache-key', freshData, 3600);

return freshData;
```

## 🔄 Database Migrations

When you modify the schema, create a new migration:

```bash
# After modifying prisma/schema.prisma
npm run db:migrate

# You'll be prompted to name your migration
# Example: add_new_field_to_campaigns
```

This will:
1. Create a new migration SQL file
2. Apply the migration to your database
3. Regenerate the Prisma Client

## 🔍 Full-Text Search

The `SearchIndex` table enables fast full-text searching:

```typescript
// Search for keywords or campaigns
const results = await prisma.searchIndex.findMany({
  where: {
    OR: [
      { title: { contains: searchQuery } },
      { content: { contains: searchQuery } },
    ],
  },
  orderBy: {
    createdAt: 'desc',
  },
});
```

## 📈 Seeding Data

The database comes pre-seeded with realistic mock data for:
- LinkedIn Ads (30 days of data)
- Google Ads (campaigns and metrics)
- SEMrush Keywords (50 keywords with rankings)
- Social Media (LinkedIn, Instagram, Facebook, Twitter)
- Search Index (keywords and campaigns)

To re-seed the database:

```bash
npm run db:seed
```

**Note**: This will add data on top of existing data. If you want to start fresh:

```bash
# Delete the database file
rm dev.db

# Run migrations to recreate tables
npm run db:migrate

# Seed with fresh data
npm run db:seed
```

## 🛠️ Troubleshooting

### Database Lock Errors

If you get "database is locked" errors:

```bash
# Make sure no other processes are using the database
# Close Prisma Studio if it's running
# Then try your operation again
```

### Schema Out of Sync

If Prisma Client complains about schema changes:

```bash
npm run db:generate
```

### Starting Fresh

To completely reset the database:

```bash
# Delete the database
rm dev.db dev.db-journal

# Recreate and seed
npm run db:migrate
npm run db:seed
```

## 📦 Dependencies

The database infrastructure uses:

- **@prisma/client**: Prisma ORM client
- **@prisma/adapter-libsql**: SQLite adapter for Prisma
- **@libsql/client**: LibSQL client library
- **prisma**: Prisma CLI for migrations
- **tsx**: TypeScript execution for seed scripts
- **dotenv**: Environment variable management

## 🔐 Security

- The database file (`*.db`) is gitignored and won't be committed
- Service account credentials are stored separately
- Environment variables are used for sensitive configuration
- The database is local and not exposed to the internet

## 🎯 Next Steps

1. **Integrate Real Data**: Replace mock data with real API calls
2. **Add Caching**: Implement caching layer for API responses
3. **Schedule Updates**: Use cron jobs to refresh data periodically
4. **Add Indexes**: Optimize query performance with indexes
5. **Backup Strategy**: Implement regular database backups

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Prisma Studio Guide](https://www.prisma.io/docs/concepts/components/prisma-studio)

---

**Database is ready to use! 🎉**

All tables are created and seeded with realistic mock data. Start building your features!
