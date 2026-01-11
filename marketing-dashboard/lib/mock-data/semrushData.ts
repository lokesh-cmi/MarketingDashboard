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
  { keyword: 'cloud infrastructure management', position: 2, change: -3, visibility: '0.15%' },
  { keyword: 'devops transformation services', position: 3, change: 5, visibility: '0.14%' },
  { keyword: 'microservices architecture consulting', position: 3, change: -1, visibility: '0.13%' },
  { keyword: 'kubernetes consulting services', position: 4, change: 8, visibility: '0.12%' },
  { keyword: 'digital transformation strategy', position: 4, change: -2, visibility: '0.12%' },
  { keyword: 'cloud native development', position: 5, change: 12, visibility: '0.11%' },
  { keyword: 'api management solutions', position: 5, change: 0, visibility: '0.11%' },
  { keyword: 'enterprise automation services', position: 6, change: -5, visibility: '0.10%' },
  { keyword: 'data analytics consulting', position: 6, change: 3, visibility: '0.10%' },
  { keyword: 'artificial intelligence solutions', position: 7, change: 15, visibility: '0.09%' },
  { keyword: 'machine learning consulting', position: 7, change: -4, visibility: '0.09%' },
  { keyword: 'cloud security services', position: 8, change: 6, visibility: '0.08%' },
  { keyword: 'agile transformation consulting', position: 8, change: 0, visibility: '0.08%' },
  { keyword: 'enterprise architecture services', position: 9, change: -7, visibility: '0.08%' },
  { keyword: 'data engineering solutions', position: 9, change: 10, visibility: '0.07%' },
  { keyword: 'serverless computing services', position: 10, change: 4, visibility: '0.07%' },
  { keyword: 'iot solutions and services', position: 10, change: -2, visibility: '0.07%' },
  { keyword: 'blockchain consulting services', position: 11, change: 8, visibility: '0.06%' },
  { keyword: 'cybersecurity consulting', position: 11, change: 0, visibility: '0.06%' },
  { keyword: 'cloud migration services', position: 12, change: -6, visibility: '0.06%' },
  { keyword: 'business intelligence solutions', position: 12, change: 14, visibility: '0.05%' },
  { keyword: 'data warehouse consulting', position: 13, change: 3, visibility: '0.05%' },
  { keyword: 'digital marketing automation', position: 13, change: -8, visibility: '0.05%' },
  { keyword: 'customer experience consulting', position: 14, change: 11, visibility: '0.05%' },
  { keyword: 'mobile app development services', position: 14, change: 0, visibility: '0.04%' },
  { keyword: 'web application development', position: 15, change: 7, visibility: '0.04%' },
  { keyword: 'quality assurance testing', position: 15, change: -3, visibility: '0.04%' },
  { keyword: 'continuous integration services', position: 16, change: 9, visibility: '0.04%' },
  { keyword: 'infrastructure as code', position: 16, change: -5, visibility: '0.04%' },
  { keyword: 'container orchestration', position: 17, change: 13, visibility: '0.03%' },
  { keyword: 'service mesh consulting', position: 17, change: 0, visibility: '0.03%' },
  { keyword: 'observability platform', position: 18, change: -4, visibility: '0.03%' },
  { keyword: 'monitoring and alerting', position: 18, change: 6, visibility: '0.03%' },
  { keyword: 'log management solutions', position: 19, change: 10, visibility: '0.03%' },
  { keyword: 'distributed systems design', position: 19, change: -7, visibility: '0.03%' },
  { keyword: 'event driven architecture', position: 20, change: 8, visibility: '0.02%' },
  { keyword: 'message queue systems', position: 20, change: 0, visibility: '0.02%' },
  { keyword: 'data streaming platforms', position: 21, change: -9, visibility: '0.02%' },
  { keyword: 'real time analytics', position: 21, change: 12, visibility: '0.02%' },
  { keyword: 'predictive analytics consulting', position: 22, change: 5, visibility: '0.02%' },
  { keyword: 'edge computing solutions', position: 22, change: -3, visibility: '0.02%' },
  { keyword: 'multi cloud strategy', position: 23, change: 7, visibility: '0.02%' },
  { keyword: 'hybrid cloud architecture', position: 23, change: 0, visibility: '0.02%' },
  { keyword: 'cloud cost optimization', position: 24, change: -6, visibility: '0.01%' },
  { keyword: 'finops consulting services', position: 24, change: 15, visibility: '0.01%' },
  { keyword: 'performance optimization', position: 25, change: 4, visibility: '0.01%' },
  { keyword: 'scalability consulting', position: 25, change: -8, visibility: '0.01%' },
  { keyword: 'system reliability engineering', position: 26, change: 11, visibility: '0.01%' },
  { keyword: 'chaos engineering practices', position: 26, change: 0, visibility: '0.01%' },
  { keyword: 'incident management solutions', position: 27, change: 6, visibility: '0.01%' },
  { keyword: 'disaster recovery planning', position: 27, change: -4, visibility: '0.01%' },
  { keyword: 'backup and restore services', position: 28, change: 9, visibility: '0.01%' },
  { keyword: 'database migration services', position: 28, change: -2, visibility: '0.01%' },
  { keyword: 'sql optimization consulting', position: 29, change: 13, visibility: '0.01%' },
  { keyword: 'nosql database solutions', position: 29, change: 0, visibility: '0.01%' },
  { keyword: 'graph database consulting', position: 30, change: -7, visibility: '0.01%' },
  { keyword: 'time series databases', position: 30, change: 8, visibility: '0.01%' },
  { keyword: 'search engine optimization', position: 31, change: 5, visibility: '0.01%' },
  { keyword: 'full text search solutions', position: 31, change: -5, visibility: '0.01%' },
  { keyword: 'content delivery network', position: 32, change: 10, visibility: '0.01%' },
  { keyword: 'cdn optimization services', position: 32, change: 0, visibility: '0.01%' },
  { keyword: 'load balancing solutions', position: 33, change: -6, visibility: '0.01%' },
  { keyword: 'network architecture design', position: 33, change: 14, visibility: '0.01%' },
  { keyword: 'vpn and security gateway', position: 34, change: 3, visibility: '0.01%' },
  { keyword: 'zero trust architecture', position: 34, change: -8, visibility: '0.01%' },
  { keyword: 'identity access management', position: 35, change: 12, visibility: '0.01%' },
  { keyword: 'oauth and authentication', position: 35, change: 0, visibility: '0.01%' },
  { keyword: 'single sign on solutions', position: 36, change: 7, visibility: '0.01%' },
  { keyword: 'multifactor authentication', position: 36, change: -4, visibility: '0.01%' },
  { keyword: 'privileged access management', position: 37, change: 9, visibility: '0.01%' },
  { keyword: 'secrets management tools', position: 37, change: -2, visibility: '0.01%' },
  { keyword: 'encryption services', position: 38, change: 11, visibility: '0.01%' },
  { keyword: 'data privacy compliance', position: 38, change: 0, visibility: '0.01%' },
  { keyword: 'gdpr compliance consulting', position: 39, change: -5, visibility: '0.01%' },
  { keyword: 'compliance automation', position: 39, change: 8, visibility: '0.01%' },
  { keyword: 'security audit services', position: 40, change: 6, visibility: '0.01%' },
  { keyword: 'penetration testing', position: 40, change: -7, visibility: '0.01%' },
  { keyword: 'vulnerability assessment', position: 41, change: 13, visibility: '0.01%' },
  { keyword: 'threat intelligence', position: 41, change: 0, visibility: '0.01%' },
  { keyword: 'security operations center', position: 42, change: -3, visibility: '0.01%' },
  { keyword: 'incident response team', position: 42, change: 10, visibility: '0.01%' },
  { keyword: 'security information management', position: 43, change: 4, visibility: '0.01%' },
  { keyword: 'endpoint security solutions', position: 43, change: -6, visibility: '0.01%' },
  { keyword: 'network security monitoring', position: 44, change: 9, visibility: '0.01%' },
  { keyword: 'intrusion detection systems', position: 44, change: 0, visibility: '0.01%' },
  { keyword: 'firewall management services', position: 45, change: -8, visibility: '0.01%' },
  { keyword: 'ddos protection services', position: 45, change: 12, visibility: '0.01%' },
  { keyword: 'web application firewall', position: 46, change: 5, visibility: '0.01%' },
  { keyword: 'api security gateway', position: 46, change: -4, visibility: '0.01%' },
  { keyword: 'bot management solutions', position: 47, change: 11, visibility: '0.01%' },
  { keyword: 'fraud detection systems', position: 47, change: 0, visibility: '0.01%' },
  { keyword: 'anomaly detection ai', position: 48, change: 7, visibility: '0.01%' },
  { keyword: 'behavioral analytics', position: 48, change: -5, visibility: '0.01%' },
  { keyword: 'user activity monitoring', position: 49, change: 14, visibility: '0.01%' },
  { keyword: 'session management security', position: 49, change: 0, visibility: '0.01%' },
  { keyword: 'rate limiting solutions', position: 50, change: -7, visibility: '0.01%' },
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
