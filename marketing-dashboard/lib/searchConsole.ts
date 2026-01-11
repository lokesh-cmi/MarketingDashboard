import { google } from 'googleapis';

// Initialize the Search Console client
let searchConsoleClient: any = null;

function getSearchConsoleClient() {
  if (!searchConsoleClient) {
    const credentials = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_KEY || '{}');
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    searchConsoleClient = google.searchconsole({
      version: 'v1',
      auth,
    });
  }
  return searchConsoleClient;
}

export interface SearchConsoleData {
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

export interface SearchConsoleSummary {
  totalImpressions: number;
  totalClicks: number;
  avgCTR: number;
  avgPosition: number;
  dailyData: SearchConsoleData[];
}

export interface QueryData {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface PageData {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

/**
 * Fetch top queries from Google Search Console
 * @param siteUrl - Search Console property URL
 * @param days - Number of days to fetch data for
 * @param limit - Number of top queries to return
 */
export async function fetchTopQueries(siteUrl: string, days: number = 30, limit: number = 10): Promise<QueryData[]> {
  try {
    const client = getSearchConsoleClient();
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    
    console.log(`[searchConsole] Fetching top ${limit} queries`);
    
    const response = await client.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['query'],
        rowLimit: limit,
        dataState: 'final',
      },
    });
    
    const queries: QueryData[] = [];
    
    if (response.data.rows) {
      response.data.rows.forEach((row: any) => {
        queries.push({
          query: row.keys[0] || '',
          clicks: row.clicks || 0,
          impressions: row.impressions || 0,
          ctr: (row.ctr || 0) * 100,
          position: row.position || 0,
        });
      });
    }
    
    console.log(`[searchConsole] Found ${queries.length} queries`);
    return queries;
  } catch (error) {
    console.error('Error fetching top queries:', error);
    throw error;
  }
}

/**
 * Fetch top pages from Google Search Console
 * @param siteUrl - Search Console property URL
 * @param days - Number of days to fetch data for
 * @param limit - Number of top pages to return
 */
export async function fetchTopPages(siteUrl: string, days: number = 30, limit: number = 10): Promise<PageData[]> {
  try {
    const client = getSearchConsoleClient();
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    
    console.log(`[searchConsole] Fetching top ${limit} pages`);
    
    const response = await client.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['page'],
        rowLimit: limit,
        dataState: 'final',
      },
    });
    
    const pages: PageData[] = [];
    
    if (response.data.rows) {
      response.data.rows.forEach((row: any) => {
        pages.push({
          page: row.keys[0] || '',
          clicks: row.clicks || 0,
          impressions: row.impressions || 0,
          ctr: (row.ctr || 0) * 100,
          position: row.position || 0,
        });
      });
    }
    
    console.log(`[searchConsole] Found ${pages.length} pages`);
    return pages;
  } catch (error) {
    console.error('Error fetching top pages:', error);
    throw error;
  }
}

/**
 * Fetch Google Search Console data for a specific number of days
 * @param siteUrl - Search Console property URL (e.g., https://www.example.com/)
 * @param days - Number of days to fetch data for
 */
export async function fetchSearchConsoleDataByDays(siteUrl: string, days: number = 30): Promise<SearchConsoleSummary> {
  try {
    const client = getSearchConsoleClient();

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Format dates as YYYY-MM-DD
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    console.log(`[searchConsole] Fetching data from ${formatDate(startDate)} to ${formatDate(endDate)}`);

    const response = await client.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['date'],
        rowLimit: 1000,
        dataState: 'final',
      },
    });

    const dailyData: SearchConsoleData[] = [];
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalCTR = 0;
    let totalPosition = 0;
    let rowCount = 0;

    // Process the response
    if (response.data.rows) {
      response.data.rows.forEach((row: any) => {
        const date = row.keys[0];
        const impressions = row.impressions || 0;
        const clicks = row.clicks || 0;
        const ctr = (row.ctr || 0) * 100; // Convert to percentage
        const position = row.position || 0;

        dailyData.push({
          date,
          impressions,
          clicks,
          ctr: parseFloat(ctr.toFixed(2)),
          position: parseFloat(position.toFixed(1)),
        });

        totalImpressions += impressions;
        totalClicks += clicks;
        totalCTR += ctr;
        totalPosition += position;
        rowCount++;
      });
    }

    console.log(`[searchConsole] Found ${rowCount} days of data`);

    return {
      totalImpressions,
      totalClicks,
      avgCTR: parseFloat((totalCTR / (rowCount || 1)).toFixed(2)),
      avgPosition: parseFloat((totalPosition / (rowCount || 1)).toFixed(1)),
      dailyData,
    };
  } catch (error) {
    console.error('Error fetching Search Console data:', error);
    throw error;
  }
}

/**
 * Fetch Google Search Console data for the last 6 months
 * @param siteUrl - Search Console property URL (e.g., https://www.example.com/)
 */
export async function fetchSearchConsoleData(siteUrl: string): Promise<SearchConsoleSummary> {
  try {
    const client = getSearchConsoleClient();

    // Calculate date range for last 6 months
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);

    // Format dates as YYYY-MM-DD
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const response = await client.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['date'],
        rowLimit: 1000,
        dataState: 'final',
      },
    });

    const dailyData: SearchConsoleData[] = [];
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalCTR = 0;
    let totalPosition = 0;
    let rowCount = 0;

    // Process the response
    if (response.data.rows) {
      response.data.rows.forEach((row: any) => {
        const date = row.keys[0];
        const impressions = row.impressions || 0;
        const clicks = row.clicks || 0;
        const ctr = (row.ctr || 0) * 100; // Convert to percentage
        const position = row.position || 0;

        dailyData.push({
          date,
          impressions,
          clicks,
          ctr: parseFloat(ctr.toFixed(2)),
          position: parseFloat(position.toFixed(1)),
        });

        totalImpressions += impressions;
        totalClicks += clicks;
        totalCTR += ctr;
        totalPosition += position;
        rowCount++;
      });
    }

    return {
      totalImpressions,
      totalClicks,
      avgCTR: parseFloat((totalCTR / (rowCount || 1)).toFixed(2)),
      avgPosition: parseFloat((totalPosition / (rowCount || 1)).toFixed(1)),
      dailyData,
    };
  } catch (error) {
    console.error('Error fetching Search Console data:', error);
    throw error;
  }
}

/**
 * Fetch monthly aggregated Search Console data for better visualization
 * @param siteUrl - Search Console property URL
 */
export async function fetchSearchConsoleMonthlyData(siteUrl: string): Promise<SearchConsoleSummary> {
  try {
    const data = await fetchSearchConsoleData(siteUrl);
    
    // Group data by month
    const monthlyData: { [key: string]: { data: SearchConsoleData; count: number } } = {};
    
    data.dailyData.forEach((day) => {
      const date = new Date(day.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          data: {
            date: monthKey,
            impressions: 0,
            clicks: 0,
            ctr: 0,
            position: 0,
          },
          count: 0,
        };
      }
      
      monthlyData[monthKey].data.impressions += day.impressions;
      monthlyData[monthKey].data.clicks += day.clicks;
      monthlyData[monthKey].data.ctr += day.ctr;
      monthlyData[monthKey].data.position += day.position;
      monthlyData[monthKey].count += 1;
    });
    
    // Calculate averages for CTR and position, and format month names
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyDataArray = Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([monthKey, monthInfo]) => {
        const [year, month] = monthKey.split('-');
        const monthName = monthNames[parseInt(month) - 1];
        
        return {
          date: monthName,
          impressions: monthInfo.data.impressions,
          clicks: monthInfo.data.clicks,
          ctr: parseFloat((monthInfo.data.ctr / monthInfo.count).toFixed(2)),
          position: parseFloat((monthInfo.data.position / monthInfo.count).toFixed(1)),
        };
      });
    
    return {
      totalImpressions: data.totalImpressions,
      totalClicks: data.totalClicks,
      avgCTR: data.avgCTR,
      avgPosition: data.avgPosition,
      dailyData: monthlyDataArray,
    };
  } catch (error) {
    console.error('Error fetching monthly Search Console data:', error);
    throw error;
  }
}

/**
 * Format large numbers with K/M suffix
 */
export function formatMetricNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
