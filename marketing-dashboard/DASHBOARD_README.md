# Marketing Dashboard

A comprehensive marketing analytics dashboard built with Next.js, TypeScript, React, and Recharts.

## Features

- **Marketing Overview**: Top-level metrics including Total Traffic, Total Leads, Total Conversions, Total Spend, and Overall Conversion Rate
- **Category Cards**: Quick access to SEO, Paid Campaigns, and Social Media sections
- **Google Analytics Overview**: Sessions, Users, Page Views, and Engagement Rate with trend visualization
- **Search Console Overview**: Impressions, Clicks, Average Position, and CTR with weekly bar charts
- **Campaign Overview**: Campaign performance tracking with spend and leads analysis
- **Ad Report Overview**: Ad set performance with impressions, clicks, conversions, and ROAS metrics

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Icons**: Lucide React

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## Build

```bash
npm run build
```

## Project Structure

```
marketing-dashboard/
├── app/
│   ├── page.tsx          # Main dashboard page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── MetricCard.tsx              # Top metric cards
│   ├── CategoryCard.tsx            # SEO/Paid/Social category cards
│   ├── GoogleAnalyticsOverview.tsx # GA metrics and chart
│   ├── SearchConsoleOverview.tsx   # Search Console metrics and chart
│   ├── CampaignOverview.tsx        # Campaign performance chart
│   └── AdReportOverview.tsx        # Ad performance chart
└── package.json
```

## Components

### MetricCard
Displays a single metric with value, change percentage, and trend indicator.

### CategoryCard
Shows marketing category sections (SEO, Paid Campaigns, Social Media) with icons and descriptions.

### GoogleAnalyticsOverview
Interactive line chart showing session trends over time with key GA metrics.

### SearchConsoleOverview
Bar chart visualization of search impressions and clicks by week with performance metrics.

### CampaignOverview
Campaign performance visualization showing spend and leads per campaign.

### AdReportOverview
Ad set performance metrics with clicks and conversions visualization.

## Customization

All data in the dashboard is currently static. To connect real data:

1. Replace the static data arrays in each component with API calls
2. Add data fetching logic using React hooks or Next.js data fetching methods
3. Connect to your analytics APIs (Google Analytics, Search Console, etc.)

## Notes

The dashboard is fully responsive and uses a modern design system with:
- Clean card-based layout
- Consistent spacing and typography
- Color-coded trend indicators (green for positive, red for negative)
- Interactive charts with tooltips
- Professional gray-scale color palette with accent colors for charts
