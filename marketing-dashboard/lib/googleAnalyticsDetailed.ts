import { BetaAnalyticsDataClient } from '@google-analytics/data';
import path from 'path';

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

export interface PopularPage {
  path: string;
  views: number;
  percentage: number;
}

export interface CountryData {
  country: string;
  users: number;
  percentage: number;
}

export interface DeviceData {
  device: string;
  sessions: number;
  percentage: number;
}

export interface TrafficSource {
  source: string;
  sessions: number;
  percentage: number;
}

export interface EngagementMetrics {
  pageviewsPerSession: number;
  avgSessionDuration: string;
  bounceRate: number;
  scrolledUsers: number;
  engagementRate: number;
}

export interface DetailedAnalytics {
  summary: AnalyticsSummary;
  popularPages: PopularPage[];
  trafficByCountry: CountryData[];
  trafficByDevice: DeviceData[];
  trafficSources: TrafficSource[];
  engagement: EngagementMetrics;
  dailyViews: { date: string; views: number; sessions: number }[];
}

export async function fetchGoogleAnalyticsData(propertyId: string): Promise<AnalyticsSummary> {
  try {
    const client = getAnalyticsClient();

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

    if (response.rows) {
      response.rows.forEach((row) => {
        const yearMonth = row.dimensionValues?.[0]?.value || '';
        const sessions = parseInt(row.metricValues?.[0]?.value || '0');
        const users = parseInt(row.metricValues?.[1]?.value || '0');
        const pageViews = parseInt(row.metricValues?.[2]?.value || '0');
        const engagementRate = parseFloat(row.metricValues?.[3]?.value || '0') * 100;

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

export async function fetchDetailedAnalyticsData(propertyId: string): Promise<DetailedAnalytics> {
  try {
    const client = getAnalyticsClient();

    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);

    // Fetch summary data
    const summary = await fetchGoogleAnalyticsData(propertyId);

    // Fetch daily views for chart
    const [dailyResponse] = await client.runReport({
      property: propertyId,
      dateRanges: [{
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      }],
      dimensions: [{ name: 'date' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'sessions' },
      ],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });

    const dailyViews = dailyResponse.rows?.map(row => ({
      date: row.dimensionValues?.[0]?.value || '',
      views: parseInt(row.metricValues?.[0]?.value || '0'),
      sessions: parseInt(row.metricValues?.[1]?.value || '0'),
    })) || [];

    // Fetch popular pages
    const [pagesResponse] = await client.runReport({
      property: propertyId,
      dateRanges: [{
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 10,
    });

    const totalViews = summary.totalPageViews;
    const popularPages: PopularPage[] = pagesResponse.rows?.map(row => ({
      path: row.dimensionValues?.[0]?.value || '',
      views: parseInt(row.metricValues?.[0]?.value || '0'),
      percentage: (parseInt(row.metricValues?.[0]?.value || '0') / totalViews) * 100,
    })) || [];

    // Fetch traffic by country
    const [countryResponse] = await client.runReport({
      property: propertyId,
      dateRanges: [{
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      }],
      dimensions: [{ name: 'country' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      limit: 10,
    });

    const trafficByCountry: CountryData[] = countryResponse.rows?.map(row => ({
      country: row.dimensionValues?.[0]?.value || '',
      users: parseInt(row.metricValues?.[0]?.value || '0'),
      percentage: (parseInt(row.metricValues?.[0]?.value || '0') / summary.totalUsers) * 100,
    })) || [];

    // Fetch traffic by device
    const [deviceResponse] = await client.runReport({
      property: propertyId,
      dateRanges: [{
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }],
    });

    const trafficByDevice: DeviceData[] = deviceResponse.rows?.map(row => ({
      device: row.dimensionValues?.[0]?.value || '',
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      percentage: (parseInt(row.metricValues?.[0]?.value || '0') / summary.totalSessions) * 100,
    })) || [];

    // Fetch traffic sources
    const [sourceResponse] = await client.runReport({
      property: propertyId,
      dateRanges: [{
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      }],
      dimensions: [{ name: 'sessionSource' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 10,
    });

    const trafficSources: TrafficSource[] = sourceResponse.rows?.map(row => ({
      source: row.dimensionValues?.[0]?.value || '',
      sessions: parseInt(row.metricValues?.[0]?.value || '0'),
      percentage: (parseInt(row.metricValues?.[0]?.value || '0') / summary.totalSessions) * 100,
    })) || [];

    // Fetch engagement metrics
    const [engagementResponse] = await client.runReport({
      property: propertyId,
      dateRanges: [{
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      }],
      metrics: [
        { name: 'screenPageViewsPerSession' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'engagementRate' },
        { name: 'engagedSessions' },
      ],
    });

    const engagementRow = engagementResponse.rows?.[0];
    const avgDuration = parseFloat(engagementRow?.metricValues?.[1]?.value || '0');
    const minutes = Math.floor(avgDuration / 60);
    const seconds = Math.floor(avgDuration % 60);

    const engagement: EngagementMetrics = {
      pageviewsPerSession: parseFloat(engagementRow?.metricValues?.[0]?.value || '0'),
      avgSessionDuration: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      bounceRate: parseFloat(engagementRow?.metricValues?.[2]?.value || '0') * 100,
      scrolledUsers: parseInt(engagementRow?.metricValues?.[4]?.value || '0'),
      engagementRate: parseFloat(engagementRow?.metricValues?.[3]?.value || '0') * 100,
    };

    return {
      summary,
      popularPages,
      trafficByCountry,
      trafficByDevice,
      trafficSources,
      engagement,
      dailyViews,
    };
  } catch (error) {
    console.error('Error fetching detailed analytics:', error);
    throw error;
  }
}

export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}
