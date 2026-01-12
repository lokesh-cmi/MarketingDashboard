'use client';

import { useDateRange, DateRange } from '@/contexts/DateRangeContext';
import { MessageSquare } from 'lucide-react';

interface HeaderProps {
  onOpenAIAssistant?: () => void;
}

export default function Header({ onOpenAIAssistant }: HeaderProps) {
  const { dateRange, setDateRange } = useDateRange();

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value as DateRange);
  };

  return (
    <header className="relative z-10 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-white font-bold text-3xl flex items-center">
            <span className="text-4xl mr-1">𝕏</span>
            <span>Metrics</span>
          </div>
        </div>

        {/* Filters and AI Assistant */}
        <div className="flex gap-4 items-center">
          <select 
            value={dateRange}
            onChange={handleDateRangeChange}
            className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Last Week</option>
            <option>Last Month</option>
            <option>Last Quarter</option>
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
          
          {/* AI Assistant Button */}
          <button
            onClick={onOpenAIAssistant}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-xl"
          >
            <MessageSquare size={18} />
            Talk to us
          </button>
        </div>
      </div>
    </header>
  );
}
