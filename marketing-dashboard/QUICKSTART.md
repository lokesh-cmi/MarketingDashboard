# Quick Setup Guide for Google Analytics Integration

## Step 1: Configure Environment Variable

Create a `.env.local` file in the root directory with your GA4 Property ID:

```bash
GOOGLE_ANALYTICS_PROPERTY_ID=properties/YOUR_PROPERTY_ID_HERE
```

**How to find your Property ID:**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click Admin (gear icon)
3. Under Property column, click "Property Settings"
4. Copy the Property ID (numbers only, e.g., 123456789)
5. Add it in format: `properties/123456789`

## Step 2: Grant Service Account Access

Your service account email is:
```
google-analytics-service-accou@scenic-firefly-340009.iam.gserviceaccount.com
```

**Add this email to your GA4 property:**
1. Go to Google Analytics Admin
2. Click "Property Access Management"
3. Click the "+" button (Add users)
4. Enter the service account email above
5. Select "Viewer" role
6. Click "Add"

## Step 3: Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your dashboard with real Google Analytics data!

## What Data is Fetched?

The dashboard displays the following metrics for the **last 6 months**:
- **Sessions**: Total user sessions
- **Users**: Active users count  
- **Page Views**: Total page views
- **Engagement Rate**: Average engagement percentage

Data is displayed in an interactive line chart showing monthly trends.

## Troubleshooting

**"Property ID not configured"**
- Check that `.env.local` exists and has the correct property ID
- Restart the dev server: `npm run dev`

**"Permission denied" or "403 error"**
- Make sure you added the service account email to GA4
- Verify the service account has "Viewer" role
- Wait a few minutes for permissions to propagate

**"Failed to fetch analytics data"**
- Verify your property ID format: `properties/123456789`
- Check that the service account JSON file exists at `/service-account/google-analytics-account.json`
- Check the console for detailed error messages

## Files Structure

```
marketing-dashboard/
├── .env.local                              # Your GA4 property ID (create this)
├── service-account/
│   └── google-analytics-account.json      # Service account credentials (exists)
├── lib/
│   └── googleAnalytics.ts                 # GA4 API integration
├── app/
│   └── api/
│       └── google-analytics/
│           └── route.ts                   # API endpoint
└── components/
    └── GoogleAnalyticsOverview.tsx        # Dashboard component
```

## Need Help?

Check the detailed setup guide: `GOOGLE_ANALYTICS_SETUP.md`
