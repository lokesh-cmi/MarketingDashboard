import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
}

export default function MetricCard({ title, value, change, isPositive }: MetricCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-semibold text-gray-900">{value}</div>
      <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        <span>{change}</span>
      </div>
    </div>
  );
}
