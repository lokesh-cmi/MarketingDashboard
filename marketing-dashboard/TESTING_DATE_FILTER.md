# Date Range Filter - Testing & Verification

## ✅ What Was Done

### 1. Database Reset & Reseed
- Reset the database completely
- Updated seed script to use **recent dates** (relative to today)
- Reseeded all mock data with dates going back 30-365 days from today

### 2. Date Range Filter Implementation
- ✅ Created global DateRangeContext
- ✅ Made header dropdown functional
- ✅ Updated LinkedInAdsOverview component (example)
- ✅ Updated /api/linkedin-ads route (example)
- ✅ Added debug logging to track data flow
- ✅ Cleared cache

## 🧪 How to Test

### Step 1: Start the Development Server
```bash
npm run dev
```

### Step 2: Open the Dashboard
Navigate to: `http://localhost:3000`

### Step 3: Test the Date Filter

1. **Select "Paid Campaigns"** category (LinkedIn Ads will show)

2. **Check the header dropdown** - it should show "Last Month" by default

3. **Open browser console** (F12) to see debug logs

4. **Change the dropdown** to different values:
   - Last Week
   - Last Month
   - Last Quarter
   - Last 6 Months
   - Last Year

5. **Watch for changes:**
   - Console logs should show: `[LinkedInAdsOverview] Fetching data for [selected range]`
   - The LinkedIn Ads metrics should update
   - The graph should show different number of data points
   - Second fetch should show "source: cache" in console

### Expected Behavior

| Date Range | Days | Expected Data Points | What Should Change |
|------------|------|---------------------|-------------------|
| Last Week | 7 | ~7 points | Fewer data points, smaller totals |
| Last Month | 30 | ~30 points | Default view |
| Last Quarter | 90 | Limited to 30 | Same as Last Month (seed only has 30 days) |
| Last 6 Months | 180 | Limited to 30 | Same as Last Month |
| Last Year | 365 | Limited to 30 | Same as Last Month |

**Note:** Currently only LinkedIn Ads has 30 days of data. For Last Quarter, 6 Months, and Last Year to show different results, we need to expand the seed data.

## 🔍 Debug Information

### Console Logs to Look For

When you change the date range, you should see:

```
[LinkedInAdsOverview] Fetching data for Last Week (7 days)
[API /linkedin-ads] Request for 7 days
[API /linkedin-ads] Cache miss, fetching from database
[API /linkedin-ads] Filtering from 2026-01-04T...
[API /linkedin-ads] Found 7 records
[LinkedInAdsOverview] Data source: database
[LinkedInAdsOverview] Data points: 7
```

On the second load (or switching back):
```
[LinkedInAdsOverview] Fetching data for Last Week (7 days)
[API /linkedin-ads] Request for 7 days
[API /linkedin-ads] Returning cached data for 7 days
[LinkedInAdsOverview] Data source: cache
[LinkedInAdsOverview] Data points: 7
```

## 📊 Verify Data in Database

To check the actual dates in the database:

```bash
npx prisma studio
```

Then:
1. Navigate to `LinkedInAds` table
2. Check the `date` column - dates should be recent (going back 30 days from today)

## 🐛 Troubleshooting

### If Data Doesn't Refresh:

1. **Clear browser cache** and hard reload (Cmd+Shift+R)

2. **Clear API cache:**
```bash
npx tsx scripts/clear-cache.ts
```

3. **Check console for errors**

4. **Verify database has recent dates:**
```bash
npx prisma studio
```

### If Still Not Working:

1. **Restart the dev server:**
```bash
# Stop: Ctrl+C
npm run dev
```

2. **Reseed the database:**
```bash
npx tsx prisma/seed.ts
npx tsx scripts/clear-cache.ts
```

## 📝 Next Steps

To make the date filter work for **all components**, we need to:

1. **Update remaining Overview components:**
   - GoogleAdsOverview
   - GoogleAnalyticsOverview
   - SearchConsoleOverview
   - HubSpotOverview
   - SEMrushOverview
   - OktopostOverview

2. **Update all API routes:**
   - /api/google-ads
   - /api/google-analytics
   - /api/search-console
   - /api/hubspot
   - etc.

3. **Expand seed data** to include more days (up to 365) for:
   - Google Ads
   - HubSpot
   - SEMrush
   - Oktopost

4. **Update detail pages** to use the date range filter

## ✅ Current Status

- ✅ Infrastructure complete (Context, Header, Pattern established)
- ✅ Database reseeded with recent dates
- ✅ LinkedIn Ads example working
- ⏳ Remaining components need updates (follow the same pattern)

---

**Test it now!** Open the dashboard, switch to Paid Campaigns, and try changing the date range dropdown. You should see LinkedIn Ads data refresh with debug logs in the console.
