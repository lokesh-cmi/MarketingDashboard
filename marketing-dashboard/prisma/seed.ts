import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { linkedInAdsOverviewData } from '../lib/mock-data/linkedinAdsData';
import { googleAdsOverviewData } from '../lib/mock-data/googleAdsData';
import { topKeywords, siteHealthData } from '../lib/mock-data/semrushData';
import { contactLifecycleData } from '../lib/mock-data/hubspotData';
import {
  linkedInMetrics,
  linkedInTimeSeriesData,
  instagramMetrics,
  instagramTimeSeriesData,
  facebookMetrics,
  facebookTimeSeriesData,
  twitterMetrics,
  twitterTimeSeriesData
} from '../lib/mock-data/oktopostData';

const adapter = new PrismaLibSql({
  url: `file:${process.cwd()}/dev.db`,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seed...');

  // Seed LinkedIn Ads Data
  console.log('Seeding LinkedIn Ads...');
  const today = new Date();
  for (let i = 0; i < linkedInAdsOverviewData.length; i++) {
    const item = linkedInAdsOverviewData[i];
    const date = new Date(today);
    date.setDate(date.getDate() - (linkedInAdsOverviewData.length - i)); // Count backwards from today
    
    await prisma.linkedInAds.create({
      data: {
        date: date,
        clicks: item.clicks,
        spend: item.spend,
        impressions: item.impressions,
        conversions: item.conversions,
      },
    });
  }

  // Seed Google Ads Data
  console.log('Seeding Google Ads...');
  for (let i = 0; i < googleAdsOverviewData.length; i++) {
    const item = googleAdsOverviewData[i];
    const date = new Date(today);
    date.setDate(date.getDate() - (googleAdsOverviewData.length - i)); // Count backwards from today
    
    await prisma.googleAds.create({
      data: {
        date: date,
        clicks: item.clicks,
        cost: item.cost,
        conversions: item.conversions,
      },
    });
  }

  // Seed Google Ads Campaigns
  console.log('Seeding Google Ads Campaigns...');
  const campaigns = [
    {
      name: 'Applied and Gen AI',
      searchImprShare: '30.00%',
      status: 'ENABLED',
      network: 'DISPLAY NETW...',
      viewThroughConv: 91,
      avgCPC: '$216.00',
      clicks: 31,
      conversionRate: '10.43%',
    },
    {
      name: 'Intelligent Automation',
      searchImprShare: '31.00%',
      status: 'PAUSED',
      network: 'SEARCH NETWO...',
      viewThroughConv: 96,
      avgCPC: '$192.00',
      clicks: 29,
      conversionRate: '8.74%',
    },
    {
      name: 'Cloud and Data',
      searchImprShare: '31.00%',
      status: 'PAUSED',
      network: 'SEARCH NETWO...',
      viewThroughConv: 116,
      avgCPC: '$293.00',
      clicks: 29,
      conversionRate: '9.05%',
    },
    {
      name: 'Digital Products and Platforms',
      searchImprShare: '29.00%',
      status: 'PAUSED',
      network: 'DISPLAY NETW...',
      viewThroughConv: 94,
      avgCPC: '$146.00',
      clicks: 24,
      conversionRate: '8.65%',
    },
  ];

  for (const campaign of campaigns) {
    await prisma.googleAdsCampaign.create({ data: campaign });
  }

  // Seed SEMrush Keywords
  console.log('Seeding SEMrush Keywords...');
  for (const keyword of topKeywords) {
    await prisma.semrushKeyword.create({
      data: {
        keyword: keyword.keyword,
        position: keyword.position,
        change: keyword.change,
        visibility: keyword.visibility,
      },
    });
  }

  // Seed SEMrush Site Health
  console.log('Seeding SEMrush Site Health...');
  await prisma.semrushSiteHealth.create({
    data: {
      score: siteHealthData.score,
      errors: siteHealthData.errors,
      warnings: siteHealthData.warnings,
      notices: 23, // Default value
    },
  });

  // Seed Oktopost Social Media Data
  console.log('Seeding Oktopost Social Media...');
  
  // LinkedIn
  for (const item of linkedInTimeSeriesData) {
    await prisma.oktopostSocialMedia.create({
      data: {
        platform: 'LinkedIn',
        date: new Date(`2024-06-${item.date.split(' ')[0].padStart(2, '0')}`),
        followers: Number(item.followers) || 0,
        impressions: Number(item.impressions) || 0,
        engagement: Number(item.engagement) || 0,
        clicks: Number(item.clicks) || 0,
        shares: Number(item.shares) || 0,
      },
    });
  }

  // Instagram
  for (const item of instagramTimeSeriesData) {
    await prisma.oktopostSocialMedia.create({
      data: {
        platform: 'Instagram',
        date: new Date(`2024-06-${item.date.split(' ')[0].padStart(2, '0')}`),
        followers: Number(item.followers) || 0,
        reach: Number(item.reach) || 0,
        engagement: Number(item.likes) + Number(item.comments),
        likes: Number(item.likes) || 0,
        comments: Number(item.comments) || 0,
        saves: Number(item.saves) || 0,
      },
    });
  }

  // Facebook
  for (const item of facebookTimeSeriesData) {
    await prisma.oktopostSocialMedia.create({
      data: {
        platform: 'Facebook',
        date: new Date(`2024-06-${item.date.split(' ')[0].padStart(2, '0')}`),
        followers: Number(item.followers) || 0,
        reach: Number(item.reach) || 0,
        engagement: Number(item.engagement) || 0,
        reactions: Number(item.reactions) || 0,
        shares: Number(item.shares) || 0,
      },
    });
  }

  // Twitter
  for (const item of twitterTimeSeriesData) {
    await prisma.oktopostSocialMedia.create({
      data: {
        platform: 'Twitter',
        date: new Date(`2024-06-${item.date.split(' ')[0].padStart(2, '0')}`),
        followers: Number(item.followers) || 0,
        impressions: Number(item.impressions) || 0,
        engagement: Number(item.engagement) || 0,
        retweets: Number(item.retweets) || 0,
        likes: Number(item.likes) || 0,
      },
    });
  }

  // Seed HubSpot Contact data
  console.log('Seeding HubSpot Contacts...');
  for (const contact of contactLifecycleData) {
    await prisma.hubSpotContact.create({
      data: {
        stage: contact.stage,
        count: contact.total,
      },
    });
  }

  // Seed HubSpot Deals data
  console.log('Seeding HubSpot Deals...');
  const dealsToday = new Date();
  const dealsSources = [
    { source: 'Organic Search', count: 12, amount: 180000 },
    { source: 'Paid Search', count: 8, amount: 120000 },
    { source: 'Social Media', count: 15, amount: 225000 },
    { source: 'Direct Traffic', count: 10, amount: 150000 },
    { source: 'Email Marketing', count: 18, amount: 270000 },
    { source: 'Referral', count: 7, amount: 105000 },
  ];

  for (let i = 0; i < dealsSources.length; i++) {
    const deal = dealsSources[i];
    const date = new Date(dealsToday);
    date.setDate(date.getDate() - (dealsSources.length - i));
    
    await prisma.hubSpotDeals.create({
      data: {
        date: date,
        source: deal.source,
        count: deal.count,
        amount: deal.amount,
      },
    });
  }

  // Create search index entries for keywords
  console.log('Creating search index...');
  for (const keyword of topKeywords) {
    await prisma.searchIndex.create({
      data: {
        type: 'keyword',
        title: keyword.keyword,
        content: `${keyword.keyword} position ${keyword.position} visibility ${keyword.visibility}`,
        metadata: JSON.stringify({ position: keyword.position, change: keyword.change }),
      },
    });
  }

  for (const campaign of campaigns) {
    await prisma.searchIndex.create({
      data: {
        type: 'campaign',
        title: campaign.name,
        content: `${campaign.name} ${campaign.status} ${campaign.network} clicks ${campaign.clicks}`,
        metadata: JSON.stringify({ clicks: campaign.clicks, status: campaign.status }),
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
