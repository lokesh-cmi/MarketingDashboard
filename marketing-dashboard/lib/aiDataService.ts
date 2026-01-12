import prisma from './database/client';

export interface DataQueryResult {
  data: any[];
  summary: string;
  chartData?: any[];
  chartType?: 'line' | 'bar' | 'area';
}

// Helper to convert date range to days
function dateRangeToDays(dateRange: string): number {
  switch (dateRange) {
    case 'Last Week': return 7;
    case 'Last Month': return 30;
    case 'Last Quarter': return 90;
    case 'Last 6 Months': return 180;
    case 'Last Year': return 365;
    default: return 30;
  }
}

// SEMrush Keywords Query
export async function querySemrushKeywords(dateRange: string): Promise<DataQueryResult> {
  const keywords = await prisma.semrushKeyword.findMany({
    orderBy: { position: 'asc' },
    take: 10,
  });

  const summary = `Found ${keywords.length} top keywords. Top keyword: "${keywords[0]?.keyword}" at position ${keywords[0]?.position}`;
  
  const chartData = keywords.map(k => ({
    name: k.keyword.length > 20 ? k.keyword.substring(0, 20) + '...' : k.keyword,
    value: k.position,
  }));

  return {
    data: keywords,
    summary,
    chartData,
    chartType: 'bar',
  };
}

// SEMrush Site Health Query
export async function querySemrushSiteHealth(): Promise<DataQueryResult> {
  const siteHealth = await prisma.semrushSiteHealth.findFirst({
    orderBy: { date: 'desc' },
  });

  if (!siteHealth) {
    return {
      data: [],
      summary: 'No site health data available',
    };
  }

  const summary = `Site Health Score: ${siteHealth.score}/100. Errors: ${siteHealth.errors}, Warnings: ${siteHealth.warnings}`;
  
  const chartData = [
    { name: 'Score', value: siteHealth.score },
    { name: 'Errors', value: siteHealth.errors },
    { name: 'Warnings', value: siteHealth.warnings },
  ];

  return {
    data: [siteHealth],
    summary,
    chartData,
    chartType: 'bar',
  };
}

// Google Analytics Query
export async function queryGoogleAnalytics(dateRange: string): Promise<DataQueryResult> {
  const days = dateRangeToDays(dateRange);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const analytics = await prisma.googleAnalytics.findMany({
    where: { date: { gte: startDate } },
    orderBy: { date: 'asc' },
  });

  const totalSessions = analytics.reduce((sum, a) => sum + a.sessions, 0);
  const totalUsers = analytics.reduce((sum, a) => sum + a.users, 0);
  const avgEngagementRate = analytics.reduce((sum, a) => sum + a.engagementRate, 0) / analytics.length;

  const summary = `Total Sessions: ${totalSessions.toLocaleString()}, Total Users: ${totalUsers.toLocaleString()}, Avg Engagement Rate: ${avgEngagementRate.toFixed(2)}%`;
  
  const chartData = analytics.map(a => ({
    name: new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: a.sessions,
  }));

  return {
    data: analytics,
    summary,
    chartData,
    chartType: 'line',
  };
}

// Search Console Query
export async function querySearchConsole(dateRange: string): Promise<DataQueryResult> {
  const days = dateRangeToDays(dateRange);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const searchConsole = await prisma.searchConsole.findMany({
    where: { date: { gte: startDate } },
    orderBy: { date: 'asc' },
  });

  const totalImpressions = searchConsole.reduce((sum, s) => sum + s.impressions, 0);
  const totalClicks = searchConsole.reduce((sum, s) => sum + s.clicks, 0);
  const avgCTR = searchConsole.reduce((sum, s) => sum + s.ctr, 0) / searchConsole.length;
  const avgPosition = searchConsole.reduce((sum, s) => sum + s.position, 0) / searchConsole.length;

  const summary = `Total Impressions: ${totalImpressions.toLocaleString()}, Total Clicks: ${totalClicks.toLocaleString()}, Avg CTR: ${avgCTR.toFixed(2)}%, Avg Position: ${avgPosition.toFixed(1)}`;
  
  const chartData = searchConsole.map(s => ({
    name: new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: s.clicks,
  }));

  return {
    data: searchConsole,
    summary,
    chartData,
    chartType: 'line',
  };
}

// LinkedIn Ads Query
export async function queryLinkedInAds(dateRange: string): Promise<DataQueryResult> {
  const days = dateRangeToDays(dateRange);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const linkedInAds = await prisma.linkedInAds.findMany({
    where: { date: { gte: startDate } },
    orderBy: { date: 'asc' },
  });

  const totalSpend = linkedInAds.reduce((sum, l) => sum + l.spend, 0);
  const totalClicks = linkedInAds.reduce((sum, l) => sum + l.clicks, 0);
  const totalConversions = linkedInAds.reduce((sum, l) => sum + l.conversions, 0);
  const totalImpressions = linkedInAds.reduce((sum, l) => sum + l.impressions, 0);

  const summary = `Total Spend: $${totalSpend.toLocaleString()}, Total Clicks: ${totalClicks.toLocaleString()}, Total Conversions: ${totalConversions}, Total Impressions: ${totalImpressions.toLocaleString()}`;
  
  const chartData = linkedInAds.map(l => ({
    name: new Date(l.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: l.spend,
  }));

  return {
    data: linkedInAds,
    summary,
    chartData,
    chartType: 'line',
  };
}

// Google Ads Query
export async function queryGoogleAds(dateRange: string): Promise<DataQueryResult> {
  const days = dateRangeToDays(dateRange);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const googleAds = await prisma.googleAds.findMany({
    where: { date: { gte: startDate } },
    orderBy: { date: 'asc' },
  });

  const totalCost = googleAds.reduce((sum, g) => sum + g.cost, 0);
  const totalClicks = googleAds.reduce((sum, g) => sum + g.clicks, 0);
  const totalConversions = googleAds.reduce((sum, g) => sum + g.conversions, 0);

  const summary = `Total Cost: $${totalCost.toLocaleString()}, Total Clicks: ${totalClicks.toLocaleString()}, Total Conversions: ${totalConversions}`;
  
  const chartData = googleAds.map(g => ({
    name: new Date(g.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: g.cost,
  }));

  return {
    data: googleAds,
    summary,
    chartData,
    chartType: 'line',
  };
}

// HubSpot Deals Query
export async function queryHubSpotDeals(dateRange: string): Promise<DataQueryResult> {
  const days = dateRangeToDays(dateRange);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const deals = await prisma.hubSpotDeals.findMany({
    where: { date: { gte: startDate } },
    orderBy: { date: 'asc' },
  });

  const totalDeals = deals.reduce((sum, d) => sum + d.count, 0);
  const totalAmount = deals.reduce((sum, d) => sum + d.amount, 0);
  const topSource = deals.sort((a, b) => b.count - a.count)[0];

  const summary = `Total Deals: ${totalDeals}, Total Amount: $${totalAmount.toLocaleString()}, Top Source: ${topSource?.source}`;
  
  const chartData = deals.map(d => ({
    name: d.source,
    value: d.count,
  }));

  return {
    data: deals,
    summary,
    chartData,
    chartType: 'bar',
  };
}

// Oktopost Social Media Query
export async function queryOktopost(dateRange: string, platform?: string): Promise<DataQueryResult> {
  const days = dateRangeToDays(dateRange);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const whereClause: any = { date: { gte: startDate } };
  if (platform) {
    whereClause.platform = platform;
  }

  const socialMedia = await prisma.oktopostSocialMedia.findMany({
    where: whereClause,
    orderBy: { date: 'asc' },
  });

  // Group by platform
  const platformStats = socialMedia.reduce((acc: any, sm) => {
    if (!acc[sm.platform]) {
      acc[sm.platform] = { followers: 0, engagement: 0, impressions: 0 };
    }
    acc[sm.platform].followers = sm.followers;
    acc[sm.platform].engagement += sm.engagement;
    acc[sm.platform].impressions += (sm.impressions || 0);
    return acc;
  }, {});

  const platforms = Object.keys(platformStats);
  const summary = platforms.map(p => 
    `${p}: ${platformStats[p].followers.toLocaleString()} followers, ${platformStats[p].engagement.toLocaleString()} total engagement`
  ).join('; ');
  
  const chartData = platforms.map(p => ({
    name: p,
    value: platformStats[p].engagement,
  }));

  return {
    data: socialMedia,
    summary,
    chartData,
    chartType: 'bar',
  };
}

// Generic query router based on intent
export async function queryData(intent: string, dateRange: string): Promise<DataQueryResult> {
  const lowerIntent = intent.toLowerCase();

  // SEMrush
  if (lowerIntent.includes('keyword') || lowerIntent.includes('semrush') || lowerIntent.includes('seo ranking')) {
    return await querySemrushKeywords(dateRange);
  }
  
  if (lowerIntent.includes('site health') || lowerIntent.includes('errors') || lowerIntent.includes('warnings')) {
    return await querySemrushSiteHealth();
  }

  // Google Analytics
  if (lowerIntent.includes('google analytics') || lowerIntent.includes('traffic') || lowerIntent.includes('sessions') || lowerIntent.includes('users')) {
    return await queryGoogleAnalytics(dateRange);
  }

  // Search Console
  if (lowerIntent.includes('search console') || lowerIntent.includes('impressions') || lowerIntent.includes('ctr') || lowerIntent.includes('position')) {
    return await querySearchConsole(dateRange);
  }

  // LinkedIn Ads
  if (lowerIntent.includes('linkedin') && (lowerIntent.includes('ad') || lowerIntent.includes('campaign'))) {
    return await queryLinkedInAds(dateRange);
  }

  // Google Ads
  if (lowerIntent.includes('google ad') || lowerIntent.includes('adwords')) {
    return await queryGoogleAds(dateRange);
  }

  // HubSpot
  if (lowerIntent.includes('hubspot') || lowerIntent.includes('deals') || lowerIntent.includes('crm')) {
    return await queryHubSpotDeals(dateRange);
  }

  // Social Media
  if (lowerIntent.includes('social') || lowerIntent.includes('oktopost') || 
      lowerIntent.includes('facebook') || lowerIntent.includes('twitter') || 
      lowerIntent.includes('instagram') || lowerIntent.includes('linkedin post')) {
    
    let platform = undefined;
    if (lowerIntent.includes('facebook')) platform = 'Facebook';
    else if (lowerIntent.includes('twitter')) platform = 'Twitter';
    else if (lowerIntent.includes('instagram')) platform = 'Instagram';
    else if (lowerIntent.includes('linkedin') && !lowerIntent.includes('ad')) platform = 'LinkedIn';
    
    return await queryOktopost(dateRange, platform);
  }

  // Default: return Google Analytics
  return await queryGoogleAnalytics(dateRange);
}
