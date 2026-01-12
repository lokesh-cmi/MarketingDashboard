# Drag-and-Drop Tile System - Complete Guide

## 🎯 Overview

The marketing dashboard features a comprehensive drag-and-drop tile system with pin/unpin functionality, allowing users to customize the layout of overview tiles for each category (SEO, Paid Campaigns, Social Media).

## ✨ Features

### 1. Drag and Drop
- **Drag tiles** to reorder them within their category
- **Visual feedback** during drag (opacity change, scale effect)
- **Drop zones** highlighted with blue ring when dragging over
- **Smooth animations** for better user experience

### 2. Pin/Unpin Functionality
- **Pin tiles** to lock them in position (prevent dragging)
- **Unpin tiles** to allow repositioning
- **Visual indicators**:
  - Pinned tiles show a blue "Pinned" badge in the top-left corner
  - Pin button changes color when active (blue border and text)
  - Pinned tiles cannot be dragged

### 3. Category-Specific Tiles

#### SEO Category (4 tiles)
- Google Analytics Overview
- Search Console Overview
- HubSpot Overview
- SEMrush Overview

#### Paid Campaigns Category (2 tiles)
- LinkedIn Ads Overview
- Google Ads Overview

#### Social Media Category (4 tiles)
- LinkedIn Performance
- Instagram Performance
- Facebook Performance
- Twitter Performance

## 🏗️ Technical Implementation

### File Structure

```
components/
  ├── DraggableTile.tsx          # Wrapper component for draggable tiles
  ├── PlatformPerformance.tsx    # Reusable social media platform component
  ├── LinkedInPerformance.tsx    # LinkedIn-specific tile
  ├── InstagramPerformance.tsx   # Instagram-specific tile
  ├── FacebookPerformance.tsx    # Facebook-specific tile
  └── TwitterPerformance.tsx     # Twitter-specific tile

lib/
  └── tile-order.ts              # Tile configuration and persistence logic

app/
  └── page.tsx                    # Main dashboard with drag-and-drop integration
```

### Key Components

#### 1. DraggableTile Component (`components/DraggableTile.tsx`)

**Props:**
- `id`: Unique identifier for the tile
- `children`: The tile content (overview component)
- `isPinned`: Boolean indicating if tile is pinned
- `onPinToggle`: Callback when pin button is clicked
- `onDragStart`: Callback when drag starts
- `onDragEnd`: Callback when drag ends
- `onDragOver`: Callback when dragging over a tile
- `onDrop`: Callback when dropping a tile
- `isDragging`: Boolean indicating if this tile is being dragged
- `dragOverId`: ID of tile currently being dragged over
- `className`: Optional additional CSS classes

**Features:**
- HTML5 drag-and-drop API implementation
- Hover effects showing drag handle and pin button
- Visual feedback during drag operations
- Prevents dragging when pinned

#### 2. Tile Order Management (`lib/tile-order.ts`)

**Key Functions:**

- `getTileConfig(category)`: Retrieves tile configuration for a category
- `saveTileConfig(category, tiles)`: Saves tile configuration to localStorage
- `reorderTiles(category, draggedId, targetId)`: Reorders tiles after drag-and-drop
- `toggleTilePin(category, tileId)`: Toggles pin state of a tile
- `resetTileConfig(category)`: Resets tiles to default configuration
- `migrateTileConfig(config)`: Automatically migrates old configurations to new ones

**Storage:**
- Tile configurations are persisted in browser `localStorage`
- Key: `dashboard-tile-order`
- Format: JSON object with category as keys and tile arrays as values

**Default Configurations:**

```typescript
{
  seo: [
    { id: 'google-analytics', component: 'GoogleAnalyticsOverview', isPinned: false },
    { id: 'search-console', component: 'SearchConsoleOverview', isPinned: false },
    { id: 'hubspot', component: 'HubSpotOverview', isPinned: false },
    { id: 'semrush', component: 'SEMrushOverview', isPinned: false },
  ],
  'paid-campaigns': [
    { id: 'linkedin-ads', component: 'LinkedInAdsOverview', isPinned: false },
    { id: 'google-ads', component: 'GoogleAdsOverview', isPinned: false },
  ],
  'social-media': [
    { id: 'linkedin-performance', component: 'LinkedInPerformance', isPinned: false },
    { id: 'instagram-performance', component: 'InstagramPerformance', isPinned: false },
    { id: 'facebook-performance', component: 'FacebookPerformance', isPinned: false },
    { id: 'twitter-performance', component: 'TwitterPerformance', isPinned: false },
  ],
}
```

#### 3. Dashboard Integration (`app/page.tsx`)

**State Management:**
- `tiles`: Array of tile configurations for current category
- `draggedId`: ID of tile being dragged
- `dragOverId`: ID of tile being dragged over

**Event Handlers:**
- `handleDragStart(id)`: Initiates drag operation
- `handleDragEnd()`: Completes drag operation
- `handleDragOver(id)`: Updates drag-over state
- `handleDrop(draggedId, targetId)`: Handles tile reordering
- `handlePinToggle(id)`: Toggles pin state

**Rendering:**
- Tiles rendered in a 2-column grid (`grid grid-cols-2`)
- Each tile wrapped in `DraggableTile` component
- Component mapping connects tile IDs to React components

## 📖 User Guide

### How to Drag and Drop Tiles

1. **Hover over a tile** - You'll see a grip icon (⋮⋮) appear in the top-right corner
2. **Click and hold** on the tile (not on the grip icon)
3. **Drag the tile** to a new position
4. **Drop the tile** in the desired location
5. The tile order is **automatically saved** to your browser

**Note:** You cannot drag pinned tiles. Unpin them first if you want to move them.

### How to Pin/Unpin Tiles

1. **Hover over a tile** - You'll see a pin icon (📌) appear in the top-right corner
2. **Click the pin icon** to pin/unpin the tile

**Pinned tiles:**
- Show a blue "Pinned" badge in the top-left corner
- Cannot be dragged or repositioned
- Pin button appears blue when active

**Unpinned tiles:**
- Can be freely dragged and repositioned
- Pin button appears gray when inactive

### Visual Indicators

**During Drag:**
- Dragged tile becomes semi-transparent (50% opacity)
- Dragged tile scales down slightly (95%)
- Target drop zone shows blue ring with scale-up effect (105%)

**When Pinned:**
- Blue "Pinned" badge in top-left corner
- Blue pin icon in top-right corner
- No drag handle visible

**When Unpinned:**
- Gray pin icon in top-right corner
- Grip handle visible on hover
- Can be dragged

## 🔄 Migration & Compatibility

### Automatic Migration

The system automatically migrates old tile configurations:
- Old single "Oktopost" tile → New 4 platform tiles (LinkedIn, Instagram, Facebook, Twitter)
- Migration happens automatically when loading tile configs
- Old localStorage data is preserved and upgraded

### Browser Compatibility

- Uses HTML5 drag-and-drop API (supported in all modern browsers)
- localStorage for persistence (supported in all modern browsers)
- Graceful fallback if localStorage is unavailable

## 💻 Code Examples

### Adding a New Tile

1. **Create the component** (e.g., `components/NewTile.tsx`)

2. **Add to componentMap in `app/page.tsx`:**

```typescript
import NewTile from '@/components/NewTile';

const componentMap: Record<string, React.ComponentType> = {
  // ... existing components
  NewTile,
};
```

3. **Add to DEFAULT_CONFIG in `lib/tile-order.ts`:**

```typescript
'social-media': [
  // ... existing tiles
  { id: 'new-tile', component: 'NewTile', isPinned: false },
],
```

### Programmatically Reset Tiles

```typescript
import { resetTileConfig } from '@/lib/tile-order';

// Reset social-media tiles to default
resetTileConfig('social-media');
```

### Programmatically Pin a Tile

```typescript
import { toggleTilePin, getTileConfig } from '@/lib/tile-order';

// Get current config
const tiles = getTileConfig('social-media');

// Pin a tile (if not already pinned)
if (!tiles.find(t => t.id === 'linkedin-performance')?.isPinned) {
  toggleTilePin('social-media', 'linkedin-performance');
}
```

## 🔧 Troubleshooting

### Tiles Not Dragging

1. **Check if tile is pinned** - Pinned tiles cannot be dragged
2. **Clear browser cache** - Old cached data might interfere
3. **Check browser console** - Look for JavaScript errors
4. **Verify localStorage** - Check if `dashboard-tile-order` exists in localStorage

### Tiles Not Saving Order

1. **Check browser localStorage** - Ensure it's enabled
2. **Check for errors** - Look in browser console
3. **Verify tile IDs** - Ensure all tiles have unique IDs

### Migration Issues

If old tiles persist:

1. **Clear localStorage manually:**

```javascript
localStorage.removeItem('dashboard-tile-order');
```

2. **Refresh the page** - New default config will load
3. **Switch categories** - This triggers config reload

## 🎯 Best Practices

- **Unique IDs**: Always use unique IDs for tiles within a category
- **Component Names**: Match component names exactly in componentMap
- **Default Order**: Set sensible default order in DEFAULT_CONFIG
- **Migration**: Always include migration logic when changing tile structure
- **Error Handling**: Handle localStorage errors gracefully

## 🚀 Future Enhancements

Potential improvements:
- Cross-category tile movement
- Tile size customization (small, medium, large)
- Tile visibility toggle (show/hide tiles)
- Export/import tile configurations
- Undo/redo for tile operations
- Keyboard shortcuts for pin/unpin
- Touch device optimizations

## 📊 Summary

The drag-and-drop and pin system provides users with full control over their dashboard layout while maintaining a clean, intuitive interface. All configurations are automatically saved and persist across sessions, making the dashboard truly customizable for each user's workflow.
