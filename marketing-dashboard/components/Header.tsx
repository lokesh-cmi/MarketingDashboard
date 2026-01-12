'use client';

import { useDateRange, DateRange } from '@/contexts/DateRangeContext';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

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
          <Link href="/" className="text-white font-bold text-3xl hover:opacity-80 transition-opacity cursor-pointer">
            XMetrics
          </Link>
        </div>

        {/* Filters and AI Assistant */}
        <div className="flex gap-4 items-center">
          <select 
            value={dateRange}
            onChange={handleDateRangeChange}
            className="px-4 py-2 pr-10 bg-white rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:20px_20px] bg-[right_0.5rem_center]"
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
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-purple-600 hover:bg-purple-50 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg border-2 border-purple-200 hover:border-purple-300"
          >
            <MessageSquare size={18} />
            Talk to us
          </button>
        </div>
      </div>
    </header>
  );
}
