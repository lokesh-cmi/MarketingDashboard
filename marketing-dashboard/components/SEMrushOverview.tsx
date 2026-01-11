'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { 
  top3KeywordsData, 
  top10KeywordsData, 
  top20KeywordsData, 
  top100KeywordsData,
  siteHealthData 
} from '@/lib/semrushData';

export default function SEMrushOverview() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">SEMrush Overview</h2>
        <Link 
          href="/semrush"
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          View More
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Keywords Section - Expanded */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Keywords</h3>
        <div className="grid grid-cols-4 gap-3">
          {/* Top 3 Keywords */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-baseline gap-2">
              <div className="text-xs text-gray-600">Top 3</div>
              <div className="text-xl font-bold text-gray-900">12</div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="text-xs text-green-600">new 3</div>
              <div className="text-xs text-red-600">lost 1</div>
            </div>
          </div>

          {/* Top 10 Keywords */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-baseline gap-2">
              <div className="text-xs text-gray-600">Top 10</div>
              <div className="text-xl font-bold text-gray-900">18</div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="text-xs text-green-600">new 4</div>
              <div className="text-xs text-red-600">lost 3</div>
            </div>
          </div>

          {/* Top 20 Keywords */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-baseline gap-2">
              <div className="text-xs text-gray-600">Top 20</div>
              <div className="text-xl font-bold text-gray-900">28</div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="text-xs text-green-600">new 7</div>
              <div className="text-xs text-red-600">lost 5</div>
            </div>
          </div>

          {/* Top 100 Keywords */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-baseline gap-2">
              <div className="text-xs text-gray-600">Top 100</div>
              <div className="text-xl font-bold text-gray-900">79</div>
            </div>
            <div className="flex gap-2 mt-2">
              <div className="text-xs text-green-600">new 8</div>
              <div className="text-xs text-red-600">lost 6</div>
            </div>
          </div>
        </div>
      </div>

      {/* Site Health Section - Moved to Bottom */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Site Health</h3>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Site Health Gauge - Left Side */}
          <div className="flex items-center justify-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="72"
                  cy="72"
                  r="57"
                  stroke="#E5E7EB"
                  strokeWidth="13"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="72"
                  cy="72"
                  r="57"
                  stroke="#84CC16"
                  strokeWidth="13"
                  fill="none"
                  strokeDasharray={`${(siteHealthData.score / 100) * 358.14} 358.14`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-gray-900">{siteHealthData.score}%</div>
                <div className="text-sm text-red-600">{siteHealthData.change}</div>
              </div>
            </div>
          </div>

          {/* Errors and Warnings - Right Side */}
          <div className="space-y-4">
            {/* Errors */}
            <div>
              <div className="text-sm text-gray-600 mb-2">Errors</div>
              <div className="flex items-baseline gap-2 mb-2">
                <div className="text-3xl font-bold text-red-600">
                  {siteHealthData.errors.toLocaleString()}
                </div>
                <div className="text-sm text-red-600">+{siteHealthData.errorsChange.toLocaleString()}</div>
              </div>
              <div className="h-8 relative rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-red-50"></div>
              </div>
            </div>

            {/* Warnings */}
            <div>
              <div className="text-sm text-gray-600 mb-2">Warnings</div>
              <div className="flex items-baseline gap-2 mb-2">
                <div className="text-3xl font-bold text-orange-600">
                  {siteHealthData.warnings.toLocaleString()}
                </div>
                <div className="text-sm text-green-600">{siteHealthData.warningsChange}</div>
              </div>
              <div className="h-8 relative rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
