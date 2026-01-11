# Google Search Console Integration - Setup Guide

## ✅ Implementation Complete

I've successfully integrated Google Search Console API into your marketing dashboard!

## 📦 What's Been Installed

- `googleapis` - Official Google APIs client library for Node.js

## 📁 Files Created/Modified

### Core Integration Files
1. **`/lib/searchConsole.ts`** - Search Console API client and data fetching functions
2. **`/app/api/search-console/route.ts`** - Next.js API endpoint
3. **`/components/SearchConsoleOverview.tsx`** - Updated component with real-time data

## 🎯 Features Implemented

✅ **Real-time Data Fetching**
- Fetches last 6 months of Search Console data
- Automatically aggregates data by month for better visualization

✅ **Metrics Displayed**
- **Impressions**: Total search impressions
- **Clicks**: Total clicks from search results
- **CTR (Click-Through Rate)**: Average CTR percentage
- **Average Position**: Average ranking position in search results

✅ **Beautiful Visualization**
- Composed chart with bars and line
- Bar chart for Impressions and Clicks
- Line chart for Average Position
- Monthly aggregation for cleaner visualization (Jan, Feb, Mar, Apr, May, Jun)
- Interactive tooltips with formatted numbers
- Dual Y-axis for different metric scales

## 🔧 Configuration Already Done

Your `.env.local` file already contains:
```env
GSC_SITE_URL=https://www.maritimegateway.com/
GSC_SERVICE_ACCOUNT_KEY='{...service account credentials...}'
```

## 🚀 How It Works

### Data Flow
1. Component mounts → Calls `/api/search-console`
2. API route reads `GSC_SITE_URL` and `GSC_SERVICE_ACCOUNT_KEY` from environment
3. Authenticates with Google Search Console API using service account
4. Fetches last 6 months of data from Search Console
5. Aggregates data by month (Jan, Feb, Mar, Apr, May, Jun)
6. Returns formatted JSON to frontend
7. Component displays data in chart

### API Endpoint
- **URL**: `/api/search-console`
- **Method**: GET
- **Returns**: JSON with monthly data for last 6 months

### Metrics Mapping

| Search Console Metric | Display | Description |
|----------------------|---------|-------------|
| `impressions` | Impressions | How many times your site appeared in search |
| `clicks` | Clicks | How many times users clicked your site |
| `ctr` | CTR | Click-through rate (clicks/impressions × 100) |
| `position` | Avg Position | Average ranking position in search results |

## 📊 Chart Visualization

The component uses a **Composed Chart** that combines:
- **Gray Bars**: Total Impressions (left Y-axis)
- **Blue Bars**: Total Clicks (left Y-axis)
- **Orange Line**: Average Position (right Y-axis)

Data is displayed monthly for the last 6 months (e.g., Jan, Feb, Mar, Apr, May, Jun).

This allows you to see the correlation between impressions, clicks, and your search ranking position over time.

## 🔒 Security

✅ Service account credentials are stored in `.env.local` (gitignored)
✅ API calls happen server-side only
✅ Credentials never exposed to the browser

## ⚙️ Required Permissions

Make sure your service account has access to your Search Console property:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: `https://www.maritimegateway.com/`
3. Click **Settings** (gear icon) → **Users and permissions**
4. Click **Add user**
5. Enter: `google-analytics-sa@scenic-firefly-340009.iam.gserviceaccount.com`
6. Permission level: **Owner** or **Full**
7. Click **Add**

**Note**: The service account needs at least "Full" permission to read Search Console data.

## 🐛 Troubleshooting

### Error: "Site URL not configured"
**Solution**: 
- Check that `GSC_SITE_URL` is set in `.env.local`
- Restart dev server

### Error: "Permission denied" or 403
**Solution**:
- Add service account email to Search Console property
- Grant "Full" or "Owner" permission
- Wait 5-10 minutes for permissions to propagate
- Verify the site URL format matches exactly (with or without trailing slash)

### Error: "Failed to fetch search console data"
**Solution**:
- Verify the site URL is correct in `.env.local`
- Check that `GSC_SERVICE_ACCOUNT_KEY` is valid JSON
- Verify service account has Search Console access
- Check browser console for detailed error messages

### Chart shows "Loading..." indefinitely
**Solution**:
- Check browser Network tab for API response
- Verify the API endpoint `/api/search-console` is accessible
- Check server console logs for errors

### No data or empty chart
**Solution**:
- Verify your Search Console property has data for the last 6 months
- Check that the site URL matches your verified property
- Ensure data collection is active in Search Console

## 🎨 Customization Options

### Change Date Range
Edit `/lib/searchConsole.ts` and modify the date calculation:
```typescript
startDate.setMonth(startDate.getMonth() - 6); // Change 6 to desired months
```

### Add More Metrics
The Search Console API supports additional dimensions and metrics:
- Query (search terms)
- Page (landing pages)
- Country
- Device (mobile/desktop/tablet)
- Search appearance

### Change Aggregation
Currently data is aggregated monthly. You can change to daily or weekly by modifying the grouping logic in `fetchSearchConsoleMonthlyData()`.

## 📝 Technical Details

### Dependencies
- `googleapis` - Official Google APIs client
- `recharts` - Chart library
- Service account authentication

### API Scopes
- `https://www.googleapis.com/auth/webmasters.readonly` - Read-only access to Search Console

### Data Format
```typescript
{
  totalImpressions: number,
  totalClicks: number,
  avgCTR: number,
  avgPosition: number,
  dailyData: [
    {
      date: "Jan", // Month name
      impressions: number,
      clicks: number,
      ctr: number,
      position: number
    },
    ...
  ]
}
```

## ✅ Testing

After setup:
1. Restart dev server: `npm run dev`
2. Navigate to http://localhost:3000
3. Check the "Search Console Overview" section
4. Data should load within a few seconds

## 🚀 Next Steps

1. ✅ Verify service account has Search Console access
2. ✅ Restart dev server if needed
3. ✅ Test the dashboard
4. (Optional) Customize date range or add more metrics
5. (Optional) Commit changes

---

**Your Search Console integration is ready! 🎉**
