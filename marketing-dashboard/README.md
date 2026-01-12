# Marketing Dashboard

A comprehensive, AI-powered marketing analytics dashboard built with Next.js that aggregates data from multiple platforms including Google Analytics, Google Search Console, SEMrush, HubSpot, LinkedIn Ads, Google Ads, and social media platforms.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features Guide](#key-features-guide)
- [Configuration](#configuration)
- [Database](#database)
- [API Routes](#api-routes)
- [Components](#components)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🎯 Overview

The Marketing Dashboard provides a unified view of all your marketing metrics across multiple platforms. It features real-time data integration, AI-powered analytics assistant, customizable layouts, and comprehensive data visualizations.

## ✨ Features

### Core Features
- **Multi-Platform Integration**: Google Analytics, Search Console, SEMrush, HubSpot, LinkedIn Ads, Google Ads, and Oktopost
- **Real-Time Data**: Live data from Google Analytics and Search Console APIs
- **AI Assistant**: Natural language queries powered by OpenAI GPT-4
- **Customizable Dashboard**: Drag-and-drop tiles with pin/unpin functionality
- **Interactive Charts**: Dynamic chart type switching (Line, Bar, Area)
- **Date Range Filtering**: Global date filter affecting all data views
- **Responsive Design**: Mobile-first approach with full desktop support
- **Data Caching**: Efficient caching system for improved performance
- **Database Integration**: SQLite database with Prisma ORM

### Category Views
1. **SEO Category** (4 tiles)
   - Google Analytics Overview
   - Search Console Overview
   - HubSpot Overview
   - SEMrush Overview

2. **Paid Campaigns** (2 tiles)
   - LinkedIn Ads Overview
   - Google Ads Overview

3. **Social Media** (4 tiles)
   - LinkedIn Performance
   - Instagram Performance
   - Facebook Performance
   - Twitter Performance

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Database**: SQLite with Prisma ORM
- **AI**: OpenAI GPT-4o-mini
- **Caching**: Custom caching layer with TTL
- **APIs**: Google Analytics Data API, Google Search Console API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Cloud Project (for Analytics & Search Console)
- OpenAI API Key (for AI Assistant)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/lokesh-cmi/MarketingDashboard.git
cd MarketingDashboard/marketing-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Google Analytics
GOOGLE_ANALYTICS_PROPERTY_ID=properties/YOUR_PROPERTY_ID

# Google Search Console
SEARCH_CONSOLE_SITE_URL=https://your-website.com

# OpenAI (for AI Assistant)
OPENAI_API_KEY=sk-your-openai-api-key-here
```

4. **Set up Google API credentials**

Place your Google service account JSON file at:
```
service-account/google-analytics-account.json
```

5. **Initialize database**

```bash
npx prisma generate
npx prisma db push
npm run seed
```

6. **Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
marketing-dashboard/
├── app/
│   ├── page.tsx                    # Main dashboard
│   ├── layout.tsx                  # Root layout
│   ├── analytics/                  # Google Analytics detail page
│   ├── search-console/             # Search Console detail page
│   ├── linkedin-ads/               # LinkedIn Ads detail page
│   ├── google-ads/                 # Google Ads detail page
│   ├── semrush/                    # SEMrush detail page
│   ├── hubspot/                    # HubSpot detail page
│   └── api/                        # API routes
│       ├── google-analytics/
│       ├── search-console/
│       ├── linkedin-ads/
│       ├── google-ads/
│       ├── semrush/
│       ├── hubspot/
│       ├── oktopost/
│       ├── overview-metrics/
│       └── ai-assistant/
│
├── components/
│   ├── Header.tsx                  # Header with date filter & AI button
│   ├── ClientLayout.tsx            # Client-side layout wrapper
│   ├── MetricCard.tsx              # Metric display cards
│   ├── CategoryCard.tsx            # SEO/Paid/Social category cards
│   ├── DraggableTile.tsx           # Drag-and-drop wrapper
│   ├── ChartTypeSwitcher.tsx       # Chart type selector
│   ├── AIAssistant.tsx             # AI chat interface
│   ├── GoogleAnalyticsOverview.tsx
│   ├── SearchConsoleOverview.tsx
│   ├── HubSpotOverview.tsx
│   ├── SEMrushOverview.tsx
│   ├── LinkedInAdsOverview.tsx
│   ├── GoogleAdsOverview.tsx
│   ├── PlatformPerformance.tsx
│   ├── LinkedInPerformance.tsx
│   ├── InstagramPerformance.tsx
│   ├── FacebookPerformance.tsx
│   └── TwitterPerformance.tsx
│
├── lib/
│   ├── googleAnalytics.ts          # Google Analytics API client
│   ├── searchConsole.ts            # Search Console API client
│   ├── aiDataService.ts            # AI Assistant data queries
│   ├── tile-order.ts               # Drag-and-drop logic
│   ├── database/
│   │   ├── client.ts               # Prisma client
│   │   └── cache.ts                # Caching system
│   └── mock-data/                  # Mock data files
│
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── seed.ts                     # Database seeding script
│
├── contexts/
│   └── DateRangeContext.tsx        # Global date filter context
│
├── service-account/
│   └── google-analytics-account.json
│
├── prompt.md                        # All project prompts
├── prompts.txt                      # Prompts in text format
└── README.md                        # This file
```

## 🎨 Key Features Guide

### 1. AI Assistant

**Location**: Header → "Talk to us" button

**What it does**:
- Natural language queries about your marketing data
- Powered by OpenAI GPT-4o-mini
- Automatically generates charts when relevant
- Searches across all data sources

**Example queries**:
- "What are my top keywords in SEMrush?"
- "Show me Google Analytics traffic for last month"
- "How are my LinkedIn ads performing?"
- "What's my search console CTR?"

**Setup**:
1. Get API key from [OpenAI Platform](https://platform.openai.com/)
2. Add to `.env.local`: `OPENAI_API_KEY=sk-...`
3. Restart dev server

### 2. Drag-and-Drop with Pin/Unpin

**What it does**:
- Drag tiles to reorder them within each category
- Pin tiles to lock them in position
- Configurations saved to browser localStorage

**How to use**:
1. **Drag**: Click and drag any unpinned tile
2. **Pin**: Hover over tile → Click pin icon (📌)
3. **Unpin**: Click pin icon again to unlock

**Visual indicators**:
- Pinned tiles: Blue "Pinned" badge in top-left corner
- Dragging: Tile becomes semi-transparent
- Drop zone: Blue ring highlight

### 3. Chart Type Switcher

**What it does**:
- Switch between Line, Bar, and Area charts
- Available on all overview charts

**How to use**:
1. Look for chart icon in top-right corner of any chart
2. Click to open dropdown
3. Select chart type (Line, Bar, or Area)

**Available on**:
- Google Analytics Overview
- Search Console Overview
- HubSpot Overview
- LinkedIn Ads Overview
- Google Ads Overview
- All social media platforms

### 4. Date Range Filter

**Location**: Header → Date dropdown

**What it does**:
- Filters all data across the dashboard
- Affects all charts and metrics

**Options**:
- Last Week
- Last Month
- Last Quarter
- Last 6 Months
- Last Year

**How it works**:
- Global state managed by `DateRangeContext`
- All API routes respect the date filter
- Data automatically refreshes on filter change

### 5. Real-Time Google Integrations

#### Google Analytics
- **Metrics**: Sessions, Users, Page Views, Engagement Rate
- **API**: Google Analytics Data API v4
- **Auth**: Service account
- **Detail Page**: Traffic sources, popular pages, device breakdown

#### Google Search Console
- **Metrics**: Impressions, Clicks, CTR, Average Position
- **API**: Google Search Console API
- **Auth**: Service account
- **Detail Page**: Top queries, top pages with real-time data

### 6. Database & Caching

**Database**:
- SQLite with Prisma ORM
- Tables for all platforms
- Seeded with realistic mock data

**Caching**:
- Custom caching layer with TTL
- Reduces API calls
- Improves performance
- Configurable cache duration

**Cache locations**:
- All API routes include caching
- Default TTL: 3600 seconds (1 hour)

## ⚙️ Configuration

### Google Analytics Setup

1. **Get Property ID**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Admin → Property Settings
   - Copy Property ID (e.g., 257748921)

2. **Create Service Account**:
   - [Google Cloud Console](https://console.cloud.google.com/)
   - Create new service account
   - Download JSON key
   - Place at `service-account/google-analytics-account.json`

3. **Grant Access**:
   - Google Analytics → Admin → Property Access Management
   - Add service account email with "Viewer" role

### Google Search Console Setup

1. **Add to `.env.local`**:
   ```env
   SEARCH_CONSOLE_SITE_URL=https://your-website.com
   ```

2. **Grant Access**:
   - [Search Console](https://search.google.com/search-console)
   - Settings → Users and permissions
   - Add service account email with "Full" permission

### OpenAI Setup

1. **Get API Key**:
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - API Keys → Create new secret key

2. **Add to `.env.local`**:
   ```env
   OPENAI_API_KEY=sk-proj-...
   ```

## 💾 Database

### Schema Overview

**Tables**:
- `GoogleAnalytics`: GA metrics over time
- `SearchConsole`: Search performance data
- `LinkedInAds`: LinkedIn ad campaign data
- `GoogleAds`: Google Ads performance
- `GoogleAdsCampaign`: Campaign-level data
- `SemrushKeyword`: Keyword rankings
- `SemrushSiteHealth`: Site audit data
- `HubSpotContact`: Contact lifecycle data
- `HubSpotDeals`: Deal pipeline data
- `OktopostSocialMedia`: Social media metrics
- `Cache`: Caching system

### Database Commands

```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes
npx prisma db push

# Seed database with mock data
npm run seed

# Open Prisma Studio (GUI)
npm run db:studio

# Reset database (caution: deletes all data)
npx prisma migrate reset
```

## 🔌 API Routes

All API routes follow the pattern: `/api/[platform]/route.ts`

### Available Routes

| Route | Description | Caching |
|-------|-------------|---------|
| `/api/google-analytics` | GA overview data | ✅ 1 hour |
| `/api/google-analytics-detailed` | Detailed GA data | ✅ 1 hour |
| `/api/search-console` | Search Console overview | ✅ 1 hour |
| `/api/linkedin-ads` | LinkedIn Ads data | ✅ 1 hour |
| `/api/google-ads` | Google Ads data | ✅ 1 hour |
| `/api/semrush` | SEMrush keywords & site health | ✅ 1 hour |
| `/api/hubspot` | HubSpot contacts | ✅ 1 hour |
| `/api/hubspot-detail` | HubSpot deals pipeline | ✅ 1 hour |
| `/api/oktopost` | Social media metrics | ✅ 1 hour |
| `/api/overview-metrics` | Top-level metrics | ✅ 1 hour |
| `/api/ai-assistant` | AI chat endpoint | ❌ No cache |

### API Response Format

```typescript
{
  data: any,          // The actual data
  source: "cache" | "database" | "api"  // Data source
}
```

## 🧩 Components

### Layout Components
- **Header**: Logo, date filter, AI assistant button
- **ClientLayout**: Manages AI modal state
- **DraggableTile**: Wrapper for drag-and-drop functionality

### Overview Components
- **GoogleAnalyticsOverview**: Sessions, users, page views
- **SearchConsoleOverview**: Impressions, clicks, CTR, position
- **HubSpotOverview**: Deals and contact lifecycle
- **SEMrushOverview**: Keywords and site health summary
- **LinkedInAdsOverview**: Ad performance metrics
- **GoogleAdsOverview**: Campaign performance
- **PlatformPerformance**: Reusable social media component

### Utility Components
- **MetricCard**: Display single metric with trend
- **CategoryCard**: Category navigation cards
- **ChartTypeSwitcher**: Chart type selector dropdown
- **AIAssistant**: AI chat interface

## 🐛 Troubleshooting

### Common Issues

#### "Property ID not configured"
**Solution**: Create `.env.local` with `GOOGLE_ANALYTICS_PROPERTY_ID` and restart server

#### "Permission denied" or 403 error
**Solution**: Add service account email to GA4/Search Console with proper permissions

#### Database not found
**Solution**: Run `npx prisma db push` and `npm run seed`

#### Charts not displaying
**Solution**: Check date range - ensure database has data for selected period

#### AI Assistant not responding
**Solution**: 
1. Verify `OPENAI_API_KEY` in `.env.local`
2. Check OpenAI account has credits
3. Check browser console for errors

#### Drag-and-drop not working
**Solution**:
1. Check if tile is pinned (cannot drag pinned tiles)
2. Clear browser localStorage
3. Refresh page

## 📈 Performance

- **Initial Load**: < 2s
- **Chart Rendering**: < 500ms
- **API Response**: < 100ms (cached), < 1s (fresh)
- **AI Response**: 2-5s (depends on OpenAI)

## 🔒 Security

- ✅ API keys stored in environment variables
- ✅ Service account credentials gitignored
- ✅ All sensitive API calls server-side only
- ✅ No credentials exposed to client
- ⚠️ Add rate limiting for production use
- ⚠️ Implement authentication for production use

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
GOOGLE_ANALYTICS_PROPERTY_ID=properties/123456789
SEARCH_CONSOLE_SITE_URL=https://your-website.com
OPENAI_API_KEY=sk-proj-...
DATABASE_URL=file:./dev.db
```

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database
npm run db:studio    # Open Prisma Studio
```

## 🤝 Contributing

This is a demo project created for TechAIThon. For any questions or suggestions, please open an issue.

## 📄 License

This project is for educational and demonstration purposes.

## 🙏 Acknowledgments

- Built with Next.js, React, and TypeScript
- Charts powered by Recharts
- AI powered by OpenAI
- Database managed by Prisma
- Icons from Lucide React

---

**Project Duration**: January 11-12, 2026  
**Repository**: [github.com/lokesh-cmi/MarketingDashboard](https://github.com/lokesh-cmi/MarketingDashboard)  
**Total Development Prompts**: 126 (see `prompt.md` for details)

For detailed prompt history, see [prompts.txt](./prompts.txt)
