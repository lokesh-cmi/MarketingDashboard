import { BetaAnalyticsDataClient } from '@google-analytics/data';
import path from 'path';

// Initialize the Analytics Data API client
let analyticsDataClient: BetaAnalyticsDataClient | null = null;

function getAnalyticsClient() {
  if (!analyticsDataClient) {
    const keyFilePath = path.join(process.cwd(), 'service-account', 'google-analytics-account.json');
    
    analyticsDataClient = new BetaAnalyticsDataClient({
      keyFilename: keyFilePath,
    });
  }
  return analyticsDataClient;
}

export interface AnalyticsData {
  month: string;
  sessions: number;
  users: number;
  pageViews: number;
  engagementRate: number;
}

export interface AnalyticsSummary {
  totalSessions: number;
  totalUsers: number;
  totalPageViews: number;
  avgEngagementRate: number;
  monthlyData: AnalyticsData[];
}

/**
 * Fetch Google Analytics data for the last 6 months
 * @param propertyId - GA4 Property ID (format: properties/XXXXXXXXX)
 */
export async function fetchGoogleAnalyticsData(propertyId: string): Promise<AnalyticsSummary> {
  try {
    const client = getAnalyticsClient();

    // Calculate date range for last 6 months
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);

    const [response] = await client.runReport({
      property: propertyId,
      dateRanges: [
        {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        },
      ],
      dimensions: [
        {
          name: 'yearMonth',
        },
      ],
      metrics: [
        {
          name: 'sessions',
        },
        {
          name: 'activeUsers',
        },
        {
          name: 'screenPageViews',
        },
        {
          name: 'engagementRate',
        },
      ],
      orderBys: [
        {
          dimension: {
            dimensionName: 'yearMonth',
          },
        },
      ],
    });

    const monthlyData: AnalyticsData[] = [];
    let totalSessions = 0;
    let totalUsers = 0;
    let totalPageViews = 0;
    let totalEngagementRate = 0;

    // Process the response
    if (response.rows) {
      response.rows.forEach((row) => {
        const yearMonth = row.dimensionValues?.[0]?.value || '';
        const sessions = parseInt(row.metricValues?.[0]?.value || '0');
        const users = parseInt(row.metricValues?.[1]?.value || '0');
        const pageViews = parseInt(row.metricValues?.[2]?.value || '0');
        const engagementRate = parseFloat(row.metricValues?.[3]?.value || '0') * 100;

        // Format month (convert YYYYMM to readable format)
        const year = yearMonth.substring(0, 4);
        const month = yearMonth.substring(4, 6);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthName = monthNames[parseInt(month) - 1];

        monthlyData.push({
          month: monthName,
          sessions,
          users,
          pageViews,
          engagementRate: parseFloat(engagementRate.toFixed(2)),
        });

        totalSessions += sessions;
        totalUsers += users;
        totalPageViews += pageViews;
        totalEngagementRate += engagementRate;
      });
    }

    return {
      totalSessions,
      totalUsers,
      totalPageViews,
      avgEngagementRate: parseFloat((totalEngagementRate / (response.rows?.length || 1)).toFixed(2)),
      monthlyData,
    };
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error);
    throw error;
  }
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}
