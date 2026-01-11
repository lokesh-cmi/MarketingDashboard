// Mock data for Google Ads Overview
export interface GoogleAdsData {
  date: string;
  clicks: number;
  cost: number;
  conversions: number;
}

export const googleAdsOverviewData: GoogleAdsData[] = [
  { date: 'Dec 8', clicks: 48, cost: 410, conversions: 22 },
  { date: 'Dec 12', clicks: 52, cost: 445, conversions: 24 },
  { date: 'Dec 16', clicks: 45, cost: 385, conversions: 20 },
  { date: 'Dec 20', clicks: 58, cost: 495, conversions: 27 },
  { date: 'Dec 24', clicks: 51, cost: 436, conversions: 23 },
  { date: 'Dec 28', clicks: 62, cost: 530, conversions: 29 },
  { date: 'Jan 1', clicks: 55, cost: 470, conversions: 25 },
];
