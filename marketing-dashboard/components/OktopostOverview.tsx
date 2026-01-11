'use client';

import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  linkedInMetrics, 
  linkedInTimeSeriesData,
  instagramMetrics,
  instagramTimeSeriesData,
  facebookMetrics,
  facebookTimeSeriesData,
  twitterMetrics,
  twitterTimeSeriesData
} from '@/lib/mock-data/oktopostData';

export default function OktopostOverview() {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <div className="col-span-2 space-y-6">
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

        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Followers</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(linkedInMetrics.followers)}</div>
            <div className="text-xs text-green-600 mt-1">↑ +{linkedInMetrics.followersChange}%</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Impressions</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(linkedInMetrics.impressions)}</div>
            <div className="text-xs text-green-600 mt-1">↑ +{linkedInMetrics.impressionsChange}%</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Engagement</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(linkedInMetrics.engagement)}</div>
            <div className="text-xs text-green-600 mt-1">↑ +{linkedInMetrics.engagementChange}%</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Clicks</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(linkedInMetrics.clicks || 0)}</div>
            <div className="text-xs text-green-600 mt-1">↑ +{linkedInMetrics.clicksChange}%</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Shares</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(linkedInMetrics.shares || 0)}</div>
            <div className="text-xs text-green-600 mt-1">↑ +{linkedInMetrics.sharesChange}%</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={linkedInTimeSeriesData}>
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

        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <div className="text-sm text-gray-600 mb-1">Followers</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(instagramMetrics.followers)}</div>
            <div className="text-xs text-green-600 mt-1">↑ +{instagramMetrics.followersChange}%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <div className="text-sm text-gray-600 mb-1">Reach</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(instagramMetrics.reach || 0)}</div>
            <div className="text-xs text-green-600 mt-1">↑ +{instagramMetrics.reachChange}%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <div className="text-sm text-gray-600 mb-1">Likes</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(instagramMetrics.likes || 0)}</div>
            <div className="text-xs text-green-600 mt-1">↑ +{instagramMetrics.likesChange}%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <div className="text-sm text-gray-600 mb-1">Comments</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(instagramMetrics.comments || 0)}</div>
            <div className="text-xs text-green-600 mt-1">↑ +{instagramMetrics.commentsChange}%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <div className="text-sm text-gray-600 mb-1">Saves</div>
            <div className="text-2xl font-bold text-gray-900">{formatNumber(instagramMetrics.saves || 0)}</div>
            <div className="text-xs text-green-600 mt-1">↑ +{instagramMetrics.savesChange}%</div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={instagramTimeSeriesData}>
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

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="text-xs text-gray-600 mb-1">Followers</div>
              <div className="text-xl font-bold text-gray-900">{formatNumber(facebookMetrics.followers)}</div>
              <div className="text-xs text-green-600 mt-1">↑ +{facebookMetrics.followersChange}%</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="text-xs text-gray-600 mb-1">Reach</div>
              <div className="text-xl font-bold text-gray-900">{formatNumber(facebookMetrics.reach || 0)}</div>
              <div className="text-xs text-green-600 mt-1">↑ +{facebookMetrics.reachChange}%</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="text-xs text-gray-600 mb-1">Engagement</div>
              <div className="text-xl font-bold text-gray-900">{formatNumber(facebookMetrics.engagement)}</div>
              <div className="text-xs text-green-600 mt-1">↑ +{facebookMetrics.engagementChange}%</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="text-xs text-gray-600 mb-1">Reactions</div>
              <div className="text-xl font-bold text-gray-900">{formatNumber(facebookMetrics.reactions || 0)}</div>
              <div className="text-xs text-green-600 mt-1">↑ +{facebookMetrics.reactionsChange}%</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 col-span-2">
              <div className="text-xs text-gray-600 mb-1">Shares</div>
              <div className="text-xl font-bold text-gray-900">{formatNumber(facebookMetrics.shares || 0)}</div>
              <div className="text-xs text-green-600 mt-1">↑ +{facebookMetrics.sharesChange}%</div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={facebookTimeSeriesData}>
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

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
              <div className="text-xs text-gray-600 mb-1">Followers</div>
              <div className="text-xl font-bold text-gray-900">{formatNumber(twitterMetrics.followers)}</div>
              <div className="text-xs text-green-600 mt-1">↑ +{twitterMetrics.followersChange}%</div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
              <div className="text-xs text-gray-600 mb-1">Impressions</div>
              <div className="text-xl font-bold text-gray-900">{formatNumber(twitterMetrics.impressions)}</div>
              <div className="text-xs text-green-600 mt-1">↑ +{twitterMetrics.impressionsChange}%</div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
              <div className="text-xs text-gray-600 mb-1">Engagement</div>
              <div className="text-xl font-bold text-gray-900">{formatNumber(twitterMetrics.engagement)}</div>
              <div className="text-xs text-green-600 mt-1">↑ +{twitterMetrics.engagementChange}%</div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
              <div className="text-xs text-gray-600 mb-1">Retweets</div>
              <div className="text-xl font-bold text-gray-900">{formatNumber(twitterMetrics.retweets || 0)}</div>
              <div className="text-xs text-green-600 mt-1">↑ +{twitterMetrics.retweetsChange}%</div>
            </div>
            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100 col-span-2">
              <div className="text-xs text-gray-600 mb-1">Likes</div>
              <div className="text-xl font-bold text-gray-900">{formatNumber(twitterMetrics.likes || 0)}</div>
              <div className="text-xs text-green-600 mt-1">↑ +{twitterMetrics.likesChange}%</div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={twitterTimeSeriesData}>
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
