'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BarChart3, LineChart as LineChartIcon, AreaChart as AreaChartIcon, ChevronDown } from 'lucide-react';

export type ChartType = 'line' | 'bar' | 'area';

interface ChartTypeSwitcherProps {
  currentType: ChartType;
  availableTypes: ChartType[];
  onTypeChange: (type: ChartType) => void;
}

export default function ChartTypeSwitcher({ currentType, availableTypes, onTypeChange }: ChartTypeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const chartTypeConfig = {
    line: { icon: LineChartIcon, label: 'Line' },
    bar: { icon: BarChart3, label: 'Bar' },
    area: { icon: AreaChartIcon, label: 'Area' },
  };

  const handleTypeSelect = (type: ChartType) => {
    onTypeChange(type);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const CurrentIcon = chartTypeConfig[currentType].icon;

  return (
    <div ref={dropdownRef} className="absolute top-2 right-2 z-10">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1.5 bg-white hover:bg-gray-50 rounded-lg shadow-md border border-gray-200 transition-all"
        title="Change chart type"
      >
        <CurrentIcon size={14} className="text-gray-600" />
        <ChevronDown size={12} className="text-gray-500" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 overflow-hidden">
          {availableTypes.map((type) => {
            const config = chartTypeConfig[type];
            const Icon = config.icon;
            const isActive = currentType === type;

            return (
              <button
                key={type}
                onClick={() => handleTypeSelect(type)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                <span>{config.label}</span>
                {isActive && (
                  <span className="ml-auto text-purple-600">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
