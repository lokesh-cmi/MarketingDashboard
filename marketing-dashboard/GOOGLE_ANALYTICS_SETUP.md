# Google Analytics Integration Guide

## Setup Instructions

### 1. Environment Configuration

Edit the `.env.local` file and add your Google Analytics Property ID:

```env
GOOGLE_ANALYTICS_PROPERTY_ID=properties/YOUR_PROPERTY_ID
```

**Finding your Property ID:**
- Go to Google Analytics 4
- Navigate to Admin > Property Settings
- Your Property ID will be displayed (format: XXXXXXXXX)
- Add it in the format: `properties/XXXXXXXXX`

### 2. Service Account Setup

The service account JSON file is already in place at:
```
/service-account/google-analytics-account.json
```

**Important:** Make sure this service account has been granted access to your GA4 property:
1. Go to Google Analytics 4
2. Navigate to Admin > Property Access Management
3. Click "Add users"
4. Add the service account email: `google-analytics-service-accou@scenic-firefly-340009.iam.gserviceaccount.com`
5. Grant "Viewer" permissions

### 3. Security

Add these files to `.gitignore` to prevent committing sensitive data:
```
.env.local
/service-account/*.json
```

### 4. API Endpoints

The following API endpoint has been created:
- `GET /api/google-analytics` - Fetches last 6 months of analytics data

### 5. Data Fetched

The integration fetches the following metrics:
- **Sessions**: Total number of sessions
- **Users**: Active users count
- **Page Views**: Total screen/page views
- **Engagement Rate**: User engagement percentage

Data is aggregated monthly for the last 6 months and displayed in a line chart.

### 6. Testing

After configuration:
1. Restart the development server: `npm run dev`
2. Navigate to the dashboard
3. The Google Analytics Overview section should load real data

### 7. Troubleshooting

**Error: "Property ID not configured"**
- Make sure `.env.local` has the correct `GOOGLE_ANALYTICS_PROPERTY_ID`
- Restart the dev server after changing environment variables

**Error: "Failed to fetch analytics data"**
- Verify the service account has access to the GA4 property
- Check that the service account JSON file exists
- Verify the property ID format is correct: `properties/XXXXXXXXX`

**Error: "Permission denied"**
- Ensure the service account email has been added as a user in GA4
- Grant at least "Viewer" role to the service account

### 8. Files Modified/Created

- `/lib/googleAnalytics.ts` - Utility functions for GA4 API
- `/app/api/google-analytics/route.ts` - API route handler
- `/components/GoogleAnalyticsOverview.tsx` - Updated component with real data fetching
- `.env.local` - Environment configuration
- `GOOGLE_ANALYTICS_SETUP.md` - This setup guide

### 9. Dependencies Added

```json
{
  "@google-analytics/data": "^4.x.x"
}
```
