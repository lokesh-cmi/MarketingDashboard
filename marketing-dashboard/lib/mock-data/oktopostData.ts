// Mock data for Oktopost Social Media Analytics

export interface SocialMediaMetrics {
  followers: number;
  followersChange: number;
  impressions: number;
  impressionsChange: number;
  engagement: number;
  engagementChange: number;
  clicks?: number;
  clicksChange?: number;
  shares?: number;
  sharesChange?: number;
  likes?: number;
  likesChange?: number;
  comments?: number;
  commentsChange?: number;
  saves?: number;
  savesChange?: number;
  reach?: number;
  reachChange?: number;
  reactions?: number;
  reactionsChange?: number;
  retweets?: number;
  retweetsChange?: number;
}

export interface TimeSeriesData {
  date: string;
  [key: string]: string | number;
}

// LinkedIn Metrics
export const linkedInMetrics = {
  followers: 45200,
  followersChange: 8.5,
  impressions: 96100,
  impressionsChange: 18.5,
  engagement: 3495,
  engagementChange: 22.3,
  clicks: 1426,
  clicksChange: 26.1,
  shares: 384,
  sharesChange: 41.2,
};

export const linkedInTimeSeriesData: TimeSeriesData[] = [
  { date: '1 Jun', impressions: 12500, engagement: 450, clicks: 180, shares: 45, followers: 44100 },
  { date: '5 Jun', impressions: 13200, engagement: 480, clicks: 195, shares: 52, followers: 44350 },
  { date: '10 Jun', impressions: 12800, engagement: 465, clicks: 188, shares: 48, followers: 44580 },
  { date: '15 Jun', impressions: 14100, engagement: 510, clicks: 210, shares: 58, followers: 44750 },
  { date: '20 Jun', impressions: 13500, engagement: 495, clicks: 198, shares: 51, followers: 44920 },
  { date: '25 Jun', impressions: 14800, engagement: 535, clicks: 220, shares: 62, followers: 45080 },
  { date: '30 Jun', impressions: 15200, engagement: 560, clicks: 235, shares: 68, followers: 45200 },
];

// Instagram Metrics
export const instagramMetrics = {
  followers: 128500,
  followersChange: 12.3,
  reach: 230300,
  reachChange: 31.2,
  likes: 22850,
  likesChange: 28.7,
  comments: 1540,
  commentsChange: 35.4,
  saves: 3460,
  savesChange: 33.8,
};

export const instagramTimeSeriesData: TimeSeriesData[] = [
  { date: '1 Jun', likes: 2800, comments: 185, saves: 420, reach: 28500, followers: 124800 },
  { date: '5 Jun', likes: 3100, comments: 210, saves: 465, reach: 31200, followers: 125900 },
  { date: '10 Jun', likes: 2950, comments: 195, saves: 445, reach: 29800, followers: 126500 },
  { date: '15 Jun', likes: 3350, comments: 225, saves: 510, reach: 33600, followers: 127100 },
  { date: '20 Jun', likes: 3200, comments: 215, saves: 485, reach: 32100, followers: 127650 },
  { date: '25 Jun', likes: 3600, comments: 245, saves: 545, reach: 36200, followers: 128100 },
  { date: '30 Jun', likes: 3850, comments: 265, saves: 590, reach: 38900, followers: 128500 },
];

// Facebook Metrics
export const facebookMetrics = {
  followers: 98400,
  followersChange: 6.8,
  reach: 346000,
  reachChange: 20.8,
  engagement: 12578,
  engagementChange: 27.4,
  reactions: 14840,
  reactionsChange: 30.5,
  shares: 2305,
  sharesChange: 32.9,
};

export const facebookTimeSeriesData: TimeSeriesData[] = [
  { date: '1 Jun', reach: 45200, engagement: 1580, reactions: 1850, shares: 285, followers: 96800 },
  { date: '5 Jun', reach: 48500, engagement: 1720, reactions: 2010, shares: 310, followers: 97200 },
  { date: '10 Jun', reach: 46800, engagement: 1650, reactions: 1920, shares: 295, followers: 97500 },
  { date: '15 Jun', reach: 51200, engagement: 1850, reactions: 2180, shares: 340, followers: 97850 },
  { date: '20 Jun', reach: 49100, engagement: 1750, reactions: 2050, shares: 315, followers: 98100 },
  { date: '25 Jun', reach: 53800, engagement: 1950, reactions: 2320, shares: 365, followers: 98250 },
  { date: '30 Jun', reach: 56500, engagement: 2080, reactions: 2510, shares: 395, followers: 98400 },
];

// Twitter Metrics
export const twitterMetrics = {
  followers: 67800,
  followersChange: 9.7,
  impressions: 151400,
  impressionsChange: 33.6,
  engagement: 5610,
  engagementChange: 36.2,
  retweets: 1252,
  retweetsChange: 44.8,
  likes: 4320,
  likesChange: 38.1,
};

export const twitterTimeSeriesData: TimeSeriesData[] = [
  { date: '1 Jun', impressions: 18500, engagement: 680, retweets: 145, likes: 520, followers: 66200 },
  { date: '5 Jun', impressions: 20100, engagement: 745, retweets: 165, likes: 580, followers: 66550 },
  { date: '10 Jun', impressions: 19200, engagement: 710, retweets: 152, likes: 545, followers: 66900 },
  { date: '15 Jun', impressions: 22400, engagement: 825, retweets: 185, likes: 640, followers: 67150 },
  { date: '20 Jun', impressions: 21300, engagement: 790, retweets: 175, likes: 605, followers: 67400 },
  { date: '25 Jun', impressions: 24100, engagement: 895, retweets: 205, likes: 690, followers: 67600 },
  { date: '30 Jun', impressions: 25800, engagement: 965, retweets: 225, likes: 740, followers: 67800 },
];

// Aggregated metrics for all platforms
export const aggregatedMetrics = {
  totalFollowers: linkedInMetrics.followers + instagramMetrics.followers + facebookMetrics.followers + twitterMetrics.followers,
  totalImpressions: linkedInMetrics.impressions + instagramMetrics.reach + facebookMetrics.reach + twitterMetrics.impressions,
  totalEngagement: linkedInMetrics.engagement + (instagramMetrics.likes || 0) + (instagramMetrics.comments || 0) + facebookMetrics.engagement + twitterMetrics.engagement,
  avgEngagementRate: 2.84, // Average across all platforms
};
