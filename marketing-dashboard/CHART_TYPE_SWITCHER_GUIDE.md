# Chart Type Switcher Feature

## Overview
This feature allows users to dynamically switch between different chart types (Line, Bar, Area) for all visualizations across the marketing dashboard. Each chart includes a convenient icon button in the top-right corner that opens a modal with chart type options.

## Implementation Summary

### Core Component
**File:** `components/ChartTypeSwitcher.tsx`

A reusable component that:
- Displays a chart type icon button in the top-right corner of any chart
- Opens a modal with available chart type options when clicked
- Highlights the currently active chart type
- Supports three chart types: Line, Bar, and Area
- Uses purple theme to match the dashboard design

**Props:**
```typescript
interface ChartTypeSwitcherProps {
  currentType: ChartType;           // Currently selected chart type
  availableTypes: ChartType[];      // Array of available chart types
  onTypeChange: (type: ChartType) => void;  // Callback when type changes
}

export type ChartType = 'line' | 'bar' | 'area';
```

## Updated Components

### 1. **GoogleAnalyticsOverview.tsx**
- **Default Chart Type:** Line
- **Available Types:** Line, Bar, Area
- **Data Displayed:** Sessions, Users, Page Views
- **Chart Colors:** Purple gradient (`#9333ea`, `#a855f7`, `#c084fc`)

### 2. **SearchConsoleOverview.tsx**
- **Default Chart Type:** Bar (Composed Chart with position line)
- **Available Types:** Bar, Line, Area
- **Data Displayed:** Impressions, Clicks (Bar default includes Position line)
- **Chart Colors:** Purple gradient (`#9333ea`, `#a855f7`, `#c084fc`)
- **Note:** Bar chart mode uses ComposedChart to show position as a line on secondary Y-axis

### 3. **HubSpotOverview.tsx**
- **Default Chart Type:** Bar (Horizontal)
- **Available Types:** Bar, Line, Area
- **Data Displayed:** Marketing Sourced - Digital & Events by Lifecycle Stage
- **Chart Colors:** Purple (`#9333ea`) and Light Purple (`#d8b4fe`)
- **Layout:** Vertical bar chart (horizontal bars)

### 4. **LinkedInAdsOverview.tsx**
- **Default Chart Type:** Line
- **Available Types:** Line, Bar, Area
- **Data Displayed:** Clicks, Conversions
- **Chart Colors:** Purple gradient (`#9333ea`, `#c084fc`)
- **Note:** Line chart mode uses dual Y-axes for clicks and conversions

### 5. **GoogleAdsOverview.tsx**
- **Default Chart Type:** Line
- **Available Types:** Line, Bar, Area
- **Data Displayed:** Clicks
- **Chart Colors:** Purple (`#9333ea`)

### 6. **PlatformPerformance.tsx** (Social Media)
- **Default Chart Type:** Area
- **Available Types:** Area, Line, Bar
- **Data Displayed:** Engagement over time
- **Used By:** LinkedInPerformance, InstagramPerformance, FacebookPerformance, TwitterPerformance
- **Chart Colors:** Platform-specific colors with gradients
  - LinkedIn: `#0077B5`
  - Instagram: `#C13584` to `#E1306C`
  - Facebook: `#1877F2`
  - Twitter: `#1DA1F2`

## Chart Type Characteristics

### Line Chart
- Best for showing trends over time
- Uses `LineChart` from Recharts
- Includes stroke width and dot markers
- Shows clear data points

### Bar Chart
- Best for comparing discrete values
- Uses `BarChart` from Recharts
- Stacked bars for multiple series (where applicable)
- Clear visual comparison

### Area Chart
- Best for showing volume and trends
- Uses `AreaChart` from Recharts
- Includes gradient fills using `linearGradient`
- Smooth, filled visualization

## User Experience

### How to Use
1. Navigate to any overview card with a chart
2. Look for the chart type icon in the top-right corner of the chart
3. Click the icon to open the chart type selector modal
4. Select your preferred chart type (Line, Bar, or Area)
5. The chart updates immediately
6. The selected type is maintained during the session

### Modal Features
- **Clean Design:** Centered modal with backdrop
- **Visual Indicators:** Icons for each chart type
- **Active State:** Purple highlight for current selection
- **Easy Dismissal:** Click backdrop or close button to dismiss
- **Keyboard Friendly:** ESC key support (native HTML behavior)

## Technical Details

### State Management
Each component maintains its own chart type state:
```typescript
const [chartType, setChartType] = useState<ChartType>('line');
```

### Chart Rendering Logic
All components use conditional rendering:
```typescript
{chartType === 'bar' ? (
  <BarChart>...</BarChart>
) : chartType === 'area' ? (
  <AreaChart>...</AreaChart>
) : (
  <LineChart>...</LineChart>
)}
```

### Gradient Definitions
Area charts include gradient definitions for smooth fills:
```typescript
<defs>
  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
    <stop offset="95%" stopColor="#9333ea" stopOpacity={0.1}/>
  </linearGradient>
</defs>
```

## Theme Consistency

### Colors Used
- **Primary Purple:** `#9333ea` (purple-600)
- **Medium Purple:** `#a855f7` (purple-500)
- **Light Purple:** `#c084fc` (purple-400)
- **Extra Light Purple:** `#d8b4fe` (purple-300)

### Modal Styling
- **Active State:** Purple border and background (`border-purple-500`, `bg-purple-50`)
- **Hover State:** Light purple border (`hover:border-purple-200`)
- **Active Badge:** Purple background with white text

## Integration with Existing Features

### Date Range Filter
All charts respect the global date range filter from `DateRangeContext`. Chart type changes work seamlessly with date filtering.

### Drag & Drop
Chart type switcher icon is positioned to not interfere with pin/drag controls.

### Responsive Design
Charts maintain responsiveness across all chart types:
```typescript
<ResponsiveContainer width="100%" height={200}>
  {/* Chart components */}
</ResponsiveContainer>
```

## Future Enhancements

Potential improvements for future development:
1. **Persistence:** Save chart type preference to localStorage
2. **Additional Types:** Add support for Pie, Donut, or Radar charts
3. **Export Options:** Allow users to export charts in selected format
4. **Comparison Mode:** Enable side-by-side chart type comparison
5. **Animation:** Add smooth transitions between chart types
6. **Accessibility:** Enhance keyboard navigation and screen reader support

## Files Modified

### New Files
- `components/ChartTypeSwitcher.tsx`

### Updated Files
- `components/GoogleAnalyticsOverview.tsx`
- `components/SearchConsoleOverview.tsx`
- `components/HubSpotOverview.tsx`
- `components/LinkedInAdsOverview.tsx`
- `components/GoogleAdsOverview.tsx`
- `components/PlatformPerformance.tsx`

## Dependencies
- `recharts`: For chart rendering
- `lucide-react`: For icons (BarChart3, LineChart, AreaChart, X)
- `react`: For state management and component logic

## Testing Checklist
- [ ] Chart type switcher appears on all overview charts
- [ ] Modal opens and closes correctly
- [ ] All three chart types render correctly
- [ ] Chart colors match the purple theme
- [ ] Active chart type is highlighted in modal
- [ ] Chart data remains consistent across type changes
- [ ] Responsive layout works on mobile and desktop
- [ ] Integration with date filter works correctly
- [ ] No console errors or warnings
- [ ] Performance is acceptable on all chart types

---

**Version:** 1.0.0  
**Last Updated:** January 12, 2026  
**Status:** ✅ Complete - Ready for Testing
