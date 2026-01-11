'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type DateRange = 'Last Week' | 'Last Month' | 'Last Quarter' | 'Last 6 Months' | 'Last Year';

interface DateRangeContextType {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  getDateRangeInDays: () => number;
  getStartDate: () => Date;
  getEndDate: () => Date;
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRange>('Last Month');

  const getDateRangeInDays = () => {
    switch (dateRange) {
      case 'Last Week':
        return 7;
      case 'Last Month':
        return 30;
      case 'Last Quarter':
        return 90;
      case 'Last 6 Months':
        return 180;
      case 'Last Year':
        return 365;
      default:
        return 30;
    }
  };

  const getStartDate = () => {
    const days = getDateRangeInDays();
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };

  const getEndDate = () => {
    return new Date();
  };

  return (
    <DateRangeContext.Provider
      value={{
        dateRange,
        setDateRange,
        getDateRangeInDays,
        getStartDate,
        getEndDate,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  const context = useContext(DateRangeContext);
  if (context === undefined) {
    throw new Error('useDateRange must be used within a DateRangeProvider');
  }
  return context;
}
