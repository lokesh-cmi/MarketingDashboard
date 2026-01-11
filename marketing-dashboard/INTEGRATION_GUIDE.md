# Database Integration Guide

This guide shows how to integrate the database with your existing components and replace mock data with real database queries.

## 🎯 Quick Start

The database is already set up and seeded with data. You can immediately start querying it!

### Basic Query Example

```typescript
import prisma from '@/lib/database/client';

// In any server component or API route
const linkedInAds = await prisma.linkedInAds.findMany({
  orderBy: { date: 'desc' },
  take: 30,
});
```

## 📋 Step-by-Step Integration

### Example 1: Update LinkedIn Ads Overview Component

**Current:** Uses mock data from `lib/mock-data/linkedinAdsData.ts`  
**Goal:** Fetch data from database

#### Step 1: Create API Route

Create `/app/api/linkedin-ads/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import prisma from '@/lib/database/client';
import { getCachedData, setCachedData } from '@/lib/database/cache';

export async function GET() {
  try {
    const cacheKey = 'linkedin-ads-overview';
    
    // Try cache first
    const cached = await getCachedData<any>(cacheKey);
    if (cached) {
      return NextResponse.json({ data: cached, source: 'cache' });
    }

    // Fetch from database
    const data = await prisma.linkedInAds.findMany({
      orderBy: { date: 'desc' },
      take: 30,
    });

    // Transform for chart
    const chartData = data.reverse().map(item => ({
      day: item.date.toISOString().split('T')[0],
      clicks: item.clicks,
      conversions: item.conversions,
    }));

    // Cache for 1 hour
    await setCachedData(cacheKey, chartData, 3600);

    return NextResponse.json({ data: chartData, source: 'database' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
```

#### Step 2: Update Component to Use API

Update `components/LinkedInAdsOverview.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';

export function LinkedInAdsOverview({ category }: { category: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/linkedin-ads');
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching LinkedIn Ads:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6 bg-white rounded-xl shadow-sm">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {/* Your existing component code */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="clicks" stroke="#8b5cf6" strokeWidth={2} />
          <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

### Example 2: SEMrush Keywords with Search

#### Create Search API Route

Already created at `/app/api/search/route.ts`

#### Update SEMrush Page to Use Database

```typescript
'use client';

import { useEffect, useState } from 'react';
import prisma from '@/lib/database/client';

export default function SEMrushPage() {
  const [keywords, setKeywords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredKeywords, setFilteredKeywords] = useState([]);

  useEffect(() => {
    async function fetchKeywords() {
      const response = await fetch('/api/semrush/keywords');
      const data = await response.json();
      setKeywords(data.keywords);
      setFilteredKeywords(data.keywords);
    }

    fetchKeywords();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = keywords.filter(k => 
        k.keyword.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredKeywords(filtered);
    } else {
      setFilteredKeywords(keywords);
    }
  }, [searchQuery, keywords]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search keywords..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      />
      
      <div className="mt-4">
        {filteredKeywords.map(keyword => (
          <div key={keyword.id}>
            {keyword.keyword} - Position {keyword.position}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Example 3: Google Ads Campaigns with Search

The Google Ads page already has a search input. Connect it to the database:

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function GoogleAdsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

  useEffect(() => {
    async function fetchCampaigns() {
      const response = await fetch('/api/google-ads/campaigns');
      const data = await response.json();
      setCampaigns(data.campaigns);
      setFilteredCampaigns(data.campaigns);
    }

    fetchCampaigns();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = campaigns.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCampaigns(filtered);
    } else {
      setFilteredCampaigns(campaigns);
    }
  }, [searchQuery, campaigns]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search campaigns..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      />
      
      <table className="mt-4 w-full">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Clicks</th>
            <th>Conversions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredCampaigns.map(campaign => (
            <tr key={campaign.id}>
              <td>{campaign.name}</td>
              <td>{campaign.clicks}</td>
              <td>{campaign.viewThroughConv}</td>
              <td>{campaign.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## 🔄 Migration Strategy

### Option 1: Gradual Migration (Recommended)

Keep mock data as fallback while testing:

```typescript
async function fetchData() {
  try {
    const response = await fetch('/api/linkedin-ads');
    if (response.ok) {
      const result = await response.json();
      setData(result.data);
    } else {
      // Fallback to mock data
      setData(mockData);
    }
  } catch (error) {
    console.error('API failed, using mock data:', error);
    setData(mockData);
  }
}
```

### Option 2: Full Migration

Replace all mock data imports with API calls:

1. Create API routes for each data source
2. Update components to fetch from API
3. Add loading states
4. Add error handling
5. Remove mock data imports

## 📊 Available API Routes

Here are all the API routes you can create:

### Already Created
- ✅ `/api/linkedin-ads` - LinkedIn Ads data with caching
- ✅ `/api/search` - Full-text search across keywords and campaigns

### To Be Created

#### Analytics
```typescript
// /app/api/google-analytics/route.ts
// Fetch GoogleAnalytics table data

// /app/api/search-console/route.ts  
// Fetch SearchConsole table data
```

#### SEMrush
```typescript
// /app/api/semrush/keywords/route.ts
// Fetch SemrushKeyword data

// /app/api/semrush/site-health/route.ts
// Fetch SemrushSiteHealth data
```

#### Advertising
```typescript
// /app/api/google-ads/route.ts
// Fetch GoogleAds performance data

// /app/api/google-ads/campaigns/route.ts
// Fetch GoogleAdsCampaign data
```

#### CRM
```typescript
// /app/api/hubspot/contacts/route.ts
// Fetch HubSpotContact data

// /app/api/hubspot/deals/route.ts
// Fetch HubSpotDeals data
```

#### Social Media
```typescript
// /app/api/oktopost/route.ts
// Fetch OktopostSocialMedia data by platform
```

## 💡 Best Practices

### 1. Always Use Caching

```typescript
import { getCachedData, setCachedData } from '@/lib/database/cache';

const cacheKey = 'my-data-key';
const cached = await getCachedData(cacheKey);

if (!cached) {
  const freshData = await fetchFromAPI();
  await setCachedData(cacheKey, freshData, 3600); // 1 hour
  return freshData;
}

return cached;
```

### 2. Handle Loading States

```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
```

### 3. Use TypeScript Types

```typescript
import { LinkedInAds, GoogleAds } from '@prisma/client';

const ads: LinkedInAds[] = await prisma.linkedInAds.findMany();
```

### 4. Add Error Boundaries

```typescript
try {
  const data = await prisma.linkedInAds.findMany();
  return NextResponse.json({ data });
} catch (error) {
  console.error('Database error:', error);
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

## 🔍 Testing the Integration

### 1. Test API Routes

```bash
# Test LinkedIn Ads API
curl http://localhost:3000/api/linkedin-ads

# Test Search API
curl http://localhost:3000/api/search?q=marketing
```

### 2. Check Database Content

```bash
npm run db:studio
```

### 3. Verify Caching

The API response should include `source: 'cache'` or `source: 'database'`.

## 🚀 Next Steps

1. **Create Missing API Routes**: Add routes for all data sources
2. **Update Components**: Replace mock data with API calls
3. **Add Real-time Updates**: Implement periodic data refresh
4. **Schedule Data Sync**: Use node-cron to sync with real APIs
5. **Add Pagination**: For large datasets (keywords, campaigns)
6. **Implement Filters**: Date range, platform, status filters
7. **Add Export**: CSV/Excel export functionality

## 📚 Additional Resources

- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Next.js API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

**Ready to integrate! 🎉**

Start with the LinkedIn Ads API route example and gradually migrate other components.
