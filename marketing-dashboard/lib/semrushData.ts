// Mock data for SEMrush dashboard based on SEMrush UI

export interface VisibilityDataPoint {
  day: string;
  visibility: number;
}

export interface KeywordRankingDataPoint {
  day: string;
  count: number;
}

// AI Search Data
export interface AIVisibilityStats {
  aiVisibility: number;
  mentions: number;
  citedPages: number;
}

export interface AIToolStats {
  name: string;
  icon: string;
  mentions: number;
  citedPages: number;
}

export interface AIVisibilityTrendPoint {
  value: number;
}

export const aiVisibilityStats: AIVisibilityStats = {
  aiVisibility: 25,
  mentions: 117,
  citedPages: 496,
};

export const aiVisibilityTrend: AIVisibilityTrendPoint[] = [
  { value: 18 },
  { value: 19 },
  { value: 17 },
  { value: 20 },
  { value: 22 },
  { value: 21 },
  { value: 23 },
  { value: 24 },
  { value: 23 },
  { value: 25 },
];

export const aiToolsStats: AIToolStats[] = [
  { name: 'ChatGPT', icon: '💬', mentions: 25, citedPages: 207 },
  { name: 'AI Overview', icon: '🔍', mentions: 56, citedPages: 126 },
  { name: 'AI Mode', icon: '🔍', mentions: 25, citedPages: 212 },
  { name: 'Gemini', icon: '💎', mentions: 11, citedPages: 67 },
];

// SEO Data
export interface SEOStats {
  authorityScore: number;
  authorityChange: number;
  organicTraffic: string;
  trafficChange: number;
  organicKeywords: string;
  keywordsChange: number;
  paidKeywords: number;
  paidTraffic: number;
  refDomains: string;
  domainsChange: number;
  backlinks: string;
}

export const seoStats: SEOStats = {
  authorityScore: 41,
  authorityChange: 0,
  organicTraffic: '2.8M',
  trafficChange: 6.78,
  organicKeywords: '6.3K',
  keywordsChange: 10.29,
  paidKeywords: 0,
  paidTraffic: 0,
  refDomains: '7.2K',
  domainsChange: -2.52,
  backlinks: '88.5K',
};

// Position Tracking Data
export const visibilityData: VisibilityDataPoint[] = [
  { day: '1', visibility: 1.22 },
  { day: '2', visibility: 1.19 },
  { day: '3', visibility: 1.24 },
  { day: '4', visibility: 1.18 },
  { day: '5', visibility: 1.15 },
  { day: '6', visibility: 1.12 },
  { day: '7', visibility: 1.08 },
  { day: '8', visibility: 1.14 },
  { day: '9', visibility: 1.16 },
  { day: '10', visibility: 1.21 },
  { day: '11', visibility: 1.19 },
  { day: '12', visibility: 1.23 },
  { day: '13', visibility: 1.28 },
  { day: '14', visibility: 1.32 },
  { day: '15', visibility: 1.29 },
  { day: '16', visibility: 1.35 },
  { day: '17', visibility: 1.41 },
  { day: '18', visibility: 1.38 },
  { day: '19', visibility: 1.45 },
  { day: '20', visibility: 1.52 },
  { day: '21', visibility: 1.55 },
  { day: '22', visibility: 1.62 },
  { day: '23', visibility: 1.58 },
  { day: '24', visibility: 1.48 },
  { day: '25', visibility: 1.44 },
  { day: '26', visibility: 1.39 },
  { day: '27', visibility: 1.45 },
  { day: '28', visibility: 1.49 },
  { day: '29', visibility: 1.52 },
  { day: '30', visibility: 1.51 },
];

export const top3KeywordsData: KeywordRankingDataPoint[] = [
  { day: '1', count: 10 },
  { day: '2', count: 10 },
  { day: '3', count: 11 },
  { day: '4', count: 10 },
  { day: '5', count: 9 },
  { day: '6', count: 9 },
  { day: '7', count: 10 },
  { day: '8', count: 10 },
  { day: '9', count: 11 },
  { day: '10', count: 11 },
  { day: '11', count: 10 },
  { day: '12', count: 11 },
  { day: '13', count: 12 },
  { day: '14', count: 11 },
  { day: '15', count: 12 },
  { day: '16', count: 11 },
  { day: '17', count: 11 },
  { day: '18', count: 12 },
  { day: '19', count: 11 },
  { day: '20', count: 12 },
  { day: '21', count: 11 },
  { day: '22', count: 11 },
  { day: '23', count: 10 },
  { day: '24', count: 11 },
  { day: '25', count: 10 },
  { day: '26', count: 11 },
  { day: '27', count: 12 },
  { day: '28', count: 11 },
  { day: '29', count: 12 },
  { day: '30', count: 12 },
];

export const top10KeywordsData: KeywordRankingDataPoint[] = [
  { day: '1', count: 14 },
  { day: '2', count: 13 },
  { day: '3', count: 14 },
  { day: '4', count: 14 },
  { day: '5', count: 13 },
  { day: '6', count: 14 },
  { day: '7', count: 15 },
  { day: '8', count: 15 },
  { day: '9', count: 16 },
  { day: '10', count: 15 },
  { day: '11', count: 16 },
  { day: '12', count: 15 },
  { day: '13', count: 16 },
  { day: '14', count: 17 },
  { day: '15', count: 16 },
  { day: '16', count: 17 },
  { day: '17', count: 16 },
  { day: '18', count: 17 },
  { day: '19', count: 18 },
  { day: '20', count: 17 },
  { day: '21', count: 18 },
  { day: '22', count: 17 },
  { day: '23', count: 16 },
  { day: '24', count: 17 },
  { day: '25', count: 16 },
  { day: '26', count: 17 },
  { day: '27', count: 18 },
  { day: '28', count: 17 },
  { day: '29', count: 18 },
  { day: '30', count: 18 },
];

export const top20KeywordsData: KeywordRankingDataPoint[] = [
  { day: '1', count: 22 },
  { day: '2', count: 21 },
  { day: '3', count: 22 },
  { day: '4', count: 21 },
  { day: '5', count: 22 },
  { day: '6', count: 23 },
  { day: '7', count: 22 },
  { day: '8', count: 23 },
  { day: '9', count: 24 },
  { day: '10', count: 23 },
  { day: '11', count: 24 },
  { day: '12', count: 25 },
  { day: '13', count: 24 },
  { day: '14', count: 25 },
  { day: '15', count: 26 },
  { day: '16', count: 25 },
  { day: '17', count: 26 },
  { day: '18', count: 25 },
  { day: '19', count: 26 },
  { day: '20', count: 27 },
  { day: '21', count: 26 },
  { day: '22', count: 27 },
  { day: '23', count: 26 },
  { day: '24', count: 25 },
  { day: '25', count: 26 },
  { day: '26', count: 27 },
  { day: '27', count: 28 },
  { day: '28', count: 27 },
  { day: '29', count: 28 },
  { day: '30', count: 28 },
];

export const top100KeywordsData: KeywordRankingDataPoint[] = [
  { day: '1', count: 75 },
  { day: '2', count: 74 },
  { day: '3', count: 75 },
  { day: '4', count: 74 },
  { day: '5', count: 75 },
  { day: '6', count: 76 },
  { day: '7', count: 75 },
  { day: '8', count: 76 },
  { day: '9', count: 77 },
  { day: '10', count: 76 },
  { day: '11', count: 77 },
  { day: '12', count: 76 },
  { day: '13', count: 77 },
  { day: '14', count: 78 },
  { day: '15', count: 77 },
  { day: '16', count: 78 },
  { day: '17', count: 77 },
  { day: '18', count: 78 },
  { day: '19', count: 77 },
  { day: '20', count: 78 },
  { day: '21', count: 79 },
  { day: '22', count: 78 },
  { day: '23', count: 77 },
  { day: '24', count: 78 },
  { day: '25', count: 77 },
  { day: '26', count: 78 },
  { day: '27', count: 79 },
  { day: '28', count: 78 },
  { day: '29', count: 79 },
  { day: '30', count: 79 },
];

// Top Keywords Table Data
export interface TopKeyword {
  keyword: string;
  position: number;
  change: number;
  visibility: string;
}

export const topKeywords: TopKeyword[] = [
  { keyword: 'engineering culture', position: 1, change: 0, visibility: '0.17%' },
  { keyword: 'intelligent budgeting framework', position: 1, change: 0, visibility: '0.17%' },
  { keyword: 'platform engineering consulting', position: 1, change: 22, visibility: '0.17%' },
  { keyword: 'rpa services and solutions', position: 1, change: 21, visibility: '0.17%' },
  { keyword: 'site reliability engineering consulting', position: 1, change: 1, visibility: '0.17%' },
  { keyword: 'core banking orchestration', position: 2, change: 0, visibility: '0.06%' },
];

// Site Audit Data
export interface SiteHealthData {
  score: number;
  change: number;
  errors: number;
  errorsChange: number;
  warnings: number;
  warningsChange: number;
  crawledPages: number;
}

export const siteHealthData: SiteHealthData = {
  score: 66,
  change: -2,
  errors: 5180,
  errorsChange: 4739,
  warnings: 2734,
  warningsChange: -117,
  crawledPages: 10596,
};

// On Page SEO Checker Data
export interface SEOCheckerCategory {
  name: string;
  count: number;
  color: string;
}

export const seoCheckerData = {
  totalIdeas: 262,
  totalPages: 40,
  categories: [
    { name: 'Strategy', count: 0, color: '#3B82F6' },
    { name: 'Backlinks', count: 38, color: '#84CC16' },
    { name: 'User Experience', count: 41, color: '#A855F7' },
    { name: 'Technical SEO', count: 11, color: '#F97316' },
    { name: 'SERP Features', count: 6, color: '#EF4444' },
    { name: 'Semantic', count: 33, color: '#06B6D4' },
    { name: 'Content', count: 133, color: '#10B981' },
  ],
  topPages: [
    { url: 'https://xebia.com/', ideas: 7 },
    { url: 'https://xebia.com/blog/using-golang-for-your-aws-lambda-functions/', ideas: 9 },
  ],
};
