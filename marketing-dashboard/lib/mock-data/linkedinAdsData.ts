// Mock data for LinkedIn Ads Overview
export interface LinkedInAdsDailyData {
  day: string;
  clicks: number;
  spend: number;
  impressions: number;
  conversions: number;
}

// More realistic mock data for LinkedIn Ads - showing daily performance over 30 days
export const linkedInAdsOverviewData: LinkedInAdsDailyData[] = [
  { day: '1', clicks: 42, spend: 168, impressions: 3200, conversions: 8 },
  { day: '2', clicks: 38, spend: 152, impressions: 2900, conversions: 7 },
  { day: '3', clicks: 45, spend: 180, impressions: 3400, conversions: 9 },
  { day: '4', clicks: 51, spend: 204, impressions: 3800, conversions: 10 },
  { day: '5', clicks: 48, spend: 192, impressions: 3600, conversions: 9 },
  { day: '6', clicks: 35, spend: 140, impressions: 2700, conversions: 6 },
  { day: '7', clicks: 40, spend: 160, impressions: 3100, conversions: 8 },
  { day: '8', clicks: 52, spend: 208, impressions: 3900, conversions: 11 },
  { day: '9', clicks: 47, spend: 188, impressions: 3500, conversions: 9 },
  { day: '10', clicks: 44, spend: 176, impressions: 3300, conversions: 8 },
  { day: '11', clicks: 49, spend: 196, impressions: 3700, conversions: 10 },
  { day: '12', clicks: 55, spend: 220, impressions: 4100, conversions: 12 },
  { day: '13', clicks: 38, spend: 152, impressions: 2900, conversions: 7 },
  { day: '14', clicks: 42, spend: 168, impressions: 3200, conversions: 8 },
  { day: '15', clicks: 50, spend: 200, impressions: 3800, conversions: 10 },
  { day: '16', clicks: 46, spend: 184, impressions: 3500, conversions: 9 },
  { day: '17', clicks: 53, spend: 212, impressions: 4000, conversions: 11 },
  { day: '18', clicks: 48, spend: 192, impressions: 3600, conversions: 9 },
  { day: '19', clicks: 41, spend: 164, impressions: 3100, conversions: 8 },
  { day: '20', clicks: 36, spend: 144, impressions: 2800, conversions: 6 },
  { day: '21', clicks: 44, spend: 176, impressions: 3300, conversions: 8 },
  { day: '22', clicks: 49, spend: 196, impressions: 3700, conversions: 10 },
  { day: '23', clicks: 52, spend: 208, impressions: 3900, conversions: 11 },
  { day: '24', clicks: 47, spend: 188, impressions: 3500, conversions: 9 },
  { day: '25', clicks: 50, spend: 200, impressions: 3800, conversions: 10 },
  { day: '26', clicks: 45, spend: 180, impressions: 3400, conversions: 9 },
  { day: '27', clicks: 39, spend: 156, impressions: 3000, conversions: 7 },
  { day: '28', clicks: 43, spend: 172, impressions: 3200, conversions: 8 },
  { day: '29', clicks: 51, spend: 204, impressions: 3800, conversions: 10 },
  { day: '30', clicks: 54, spend: 216, impressions: 4100, conversions: 11 },
];
