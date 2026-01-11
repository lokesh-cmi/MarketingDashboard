'use client';

import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for LinkedIn
const linkedInData = [
  { date: '1 Jun', impressions: 12500, engagement: 450, clicks: 180, shares: 45 },
  { date: '5 Jun', impressions: 13200, engagement: 480, clicks: 195, shares: 52 },
  { date: '10 Jun', impressions: 12800, engagement: 465, clicks: 188, shares: 48 },
  { date: '15 Jun', impressions: 14100, engagement: 510, clicks: 210, shares: 58 },
  { date: '20 Jun', impressions: 13500, engagement: 495, clicks: 198, shares: 51 },
  { date: '25 Jun', impressions: 14800, engagement: 535, clicks: 220, shares: 62 },
  { date: '30 Jun', impressions: 15200, engagement: 560, clicks: 235, shares: 68 },
];

// Mock data for Instagram
const instagramData = [
  { date: '1 Jun', likes: 2800, comments: 185, saves: 420, reach: 28500 },
  { date: '5 Jun', likes: 3100, comments: 210, saves: 465, reach: 31200 },
  { date: '10 Jun', likes: 2950, comments: 195, saves: 445, reach: 29800 },
  { date: '15 Jun', likes: 3350, comments: 225, saves: 510, reach: 33600 },
  { date: '20 Jun', likes: 3200, comments: 215, saves: 485, reach: 32100 },
  { date: '25 Jun', likes: 3600, comments: 245, saves: 545, reach: 36200 },
  { date: '30 Jun', likes: 3850, comments: 265, saves: 590, reach: 38900 },
];

// Mock data for Facebook
const facebookData = [
  { date: '1 Jun', reach: 45200, engagement: 1580, reactions: 1850, shares: 285 },
  { date: '5 Jun', reach: 48500, engagement: 1720, reactions: 2010, shares: 310 },
  { date: '10 Jun', reach: 46800, engagement: 1650, reactions: 1920, shares: 295 },
  { date: '15 Jun', reach: 51200, engagement: 1850, reactions: 2180, shares: 340 },
  { date: '20 Jun', reach: 49100, engagement: 1750, reactions: 2050, shares: 315 },
  { date: '25 Jun', reach: 53800, engagement: 1950, reactions: 2320, shares: 365 },
  { date: '30 Jun', reach: 56500, engagement: 2080, reactions: 2510, shares: 395 },
];

// Mock data for Twitter
const twitterData = [
  { date: '1 Jun', impressions: 18500, engagement: 680, retweets: 145, likes: 520 },
  { date: '5 Jun', impressions: 20100, engagement: 745, retweets: 165, likes: 580 },
  { date: '10 Jun', impressions: 19200, engagement: 710, retweets: 152, likes: 545 },
  { date: '15 Jun', impressions: 22400, engagement: 825, retweets: 185, likes: 640 },
  { date: '20 Jun', impressions: 21300, engagement: 790, retweets: 175, likes: 605 },
  { date: '25 Jun', impressions: 24100, engagement: 895, retweets: 205, likes: 690 },
  { date: '30 Jun', impressions: 25800, engagement: 965, retweets: 225, likes: 740 },
];

export default function OktopostOverview() {
  return (
    <div className="col-span-2 space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-2xl font-bold text-gray-900">Oktopost Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Social Media Dashboard</p>
      </div>

      {/* LinkedIn Analytics */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#0077B5] rounded flex items-center justify-center text-white font-bold text-lg">
            in
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">LinkedIn Performance</h3>
            <p className="text-sm text-gray-500">Professional network engagement</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Total Impressions</div>
            <div className="text-3xl font-bold text-gray-900">96.1K</div>
            <div className="text-xs text-green-600 mt-1">↑ +18.5%</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Engagement</div>
            <div className="text-3xl font-bold text-gray-900">3,495</div>
            <div className="text-xs text-green-600 mt-1">↑ +22.3%</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Clicks</div>
            <div className="text-3xl font-bold text-gray-900">1,426</div>
            <div className="text-xs text-green-600 mt-1">↑ +26.1%</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Shares</div>
            <div className="text-3xl font-bold text-gray-900">384</div>
            <div className="text-xs text-green-600 mt-1">↑ +41.2%</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={linkedInData}>
            <defs>
              <linearGradient id="colorLinkedIn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0077B5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0077B5" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#999" />
            <YAxis tick={{ fontSize: 11 }} stroke="#999" />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="impressions" stroke="#0077B5" fillOpacity={1} fill="url(#colorLinkedIn)" name="Impressions" />
            <Line type="monotone" dataKey="engagement" stroke="#00A0DC" strokeWidth={2} name="Engagement" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Instagram Analytics */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            📷
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Instagram Insights</h3>
            <p className="text-sm text-gray-500">Visual content performance</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <div className="text-sm text-gray-600 mb-1">Total Reach</div>
            <div className="text-3xl font-bold text-gray-900">230.3K</div>
            <div className="text-xs text-green-600 mt-1">↑ +31.2%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <div className="text-sm text-gray-600 mb-1">Likes</div>
            <div className="text-3xl font-bold text-gray-900">22,850</div>
            <div className="text-xs text-green-600 mt-1">↑ +28.7%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <div className="text-sm text-gray-600 mb-1">Comments</div>
            <div className="text-3xl font-bold text-gray-900">1,540</div>
            <div className="text-xs text-green-600 mt-1">↑ +35.4%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <div className="text-sm text-gray-600 mb-1">Saves</div>
            <div className="text-3xl font-bold text-gray-900">3,460</div>
            <div className="text-xs text-green-600 mt-1">↑ +33.8%</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={instagramData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#999" />
            <YAxis tick={{ fontSize: 11 }} stroke="#999" />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="likes" fill="#E1306C" name="Likes" radius={[4, 4, 0, 0]} />
            <Bar dataKey="comments" fill="#833AB4" name="Comments" radius={[4, 4, 0, 0]} />
            <Bar dataKey="saves" fill="#FD1D1D" name="Saves" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row - Facebook & Twitter */}
      <div className="grid grid-cols-2 gap-6">
        {/* Facebook Analytics */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#1877F2] rounded flex items-center justify-center text-white font-bold text-xl">
              f
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Facebook Metrics</h3>
              <p className="text-xs text-gray-500">Community engagement</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="text-xs text-gray-600 mb-1">Reach</div>
              <div className="text-2xl font-bold text-gray-900">346K</div>
              <div className="text-xs text-green-600 mt-1">↑ +20.8%</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="text-xs text-gray-600 mb-1">Engagement</div>
              <div className="text-2xl font-bold text-gray-900">12,578</div>
              <div className="text-xs text-green-600 mt-1">↑ +27.4%</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="text-xs text-gray-600 mb-1">Reactions</div>
              <div className="text-2xl font-bold text-gray-900">14,840</div>
              <div className="text-xs text-green-600 mt-1">↑ +30.5%</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="text-xs text-gray-600 mb-1">Shares</div>
              <div className="text-2xl font-bold text-gray-900">2,305</div>
              <div className="text-xs text-green-600 mt-1">↑ +32.9%</div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={facebookData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#999" />
              <YAxis tick={{ fontSize: 10 }} stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="engagement" stroke="#1877F2" strokeWidth={2} name="Engagement" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="reactions" stroke="#4267B2" strokeWidth={2} name="Reactions" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Twitter Analytics */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#1DA1F2] rounded flex items-center justify-center text-white font-bold text-xl">
              𝕏
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Twitter Activity</h3>
              <p className="text-xs text-gray-500">Real-time engagement</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
              <div className="text-xs text-gray-600 mb-1">Impressions</div>
              <div className="text-2xl font-bold text-gray-900">151.4K</div>
              <div className="text-xs text-green-600 mt-1">↑ +33.6%</div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
              <div className="text-xs text-gray-600 mb-1">Engagement</div>
              <div className="text-2xl font-bold text-gray-900">5,610</div>
              <div className="text-xs text-green-600 mt-1">↑ +36.2%</div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
              <div className="text-xs text-gray-600 mb-1">Retweets</div>
              <div className="text-2xl font-bold text-gray-900">1,252</div>
              <div className="text-xs text-green-600 mt-1">↑ +44.8%</div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
              <div className="text-xs text-gray-600 mb-1">Likes</div>
              <div className="text-2xl font-bold text-gray-900">4,320</div>
              <div className="text-xs text-green-600 mt-1">↑ +38.1%</div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={twitterData}>
              <defs>
                <linearGradient id="colorTwitter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1DA1F2" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1DA1F2" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#999" />
              <YAxis tick={{ fontSize: 10 }} stroke="#999" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', fontSize: '11px' }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="impressions" stroke="#1DA1F2" fillOpacity={1} fill="url(#colorTwitter)" name="Impressions" />
              <Line type="monotone" dataKey="engagement" stroke="#14171A" strokeWidth={2} name="Engagement" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
