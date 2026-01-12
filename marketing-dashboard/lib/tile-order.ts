// Tile configuration and persistence logic

export interface TileConfig {
  id: string;
  component: string;
  isPinned: boolean;
}

export type Category = 'seo' | 'paid-campaigns' | 'social-media';

export interface TileOrder {
  [key: string]: TileConfig[];
}

const STORAGE_KEY = 'dashboard-tile-order';

// Default tile configurations for each category
export const DEFAULT_CONFIG: TileOrder = {
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
};

// Migrate old configuration to new format
export function migrateTileConfig(config: TileOrder): TileOrder {
  const newConfig = { ...config };

  // Migrate old Oktopost tile to new 4-platform tiles
  if (newConfig['social-media']) {
    const hasOldOktopost = newConfig['social-media'].some(
      (tile) => tile.id === 'oktopost' || tile.component === 'OktopostOverview'
    );

    if (hasOldOktopost) {
      // Remove old Oktopost tile
      newConfig['social-media'] = newConfig['social-media'].filter(
        (tile) => tile.id !== 'oktopost' && tile.component !== 'OktopostOverview'
      );

      // Add new platform tiles if they don't exist
      const platformTiles = DEFAULT_CONFIG['social-media'];
      platformTiles.forEach((platformTile) => {
        const exists = newConfig['social-media'].some((tile) => tile.id === platformTile.id);
        if (!exists) {
          newConfig['social-media'].push({ ...platformTile });
        }
      });
    }
  }

  return newConfig;
}

// Get tile configuration for a category
export function getTileConfig(category: Category): TileConfig[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const config: TileOrder = JSON.parse(stored);
      const migratedConfig = migrateTileConfig(config);
      
      // Save migrated config back to localStorage
      if (JSON.stringify(config) !== JSON.stringify(migratedConfig)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedConfig));
      }

      return migratedConfig[category] || DEFAULT_CONFIG[category];
    }
  } catch (error) {
    console.error('Error loading tile configuration:', error);
  }

  return DEFAULT_CONFIG[category];
}

// Save tile configuration for a category
export function saveTileConfig(category: Category, tiles: TileConfig[]): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const config: TileOrder = stored ? JSON.parse(stored) : {};
    config[category] = tiles;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving tile configuration:', error);
  }
}

// Reorder tiles after drag and drop
export function reorderTiles(
  category: Category,
  draggedId: string,
  targetId: string
): TileConfig[] {
  const tiles = getTileConfig(category);
  
  const draggedIndex = tiles.findIndex((t) => t.id === draggedId);
  const targetIndex = tiles.findIndex((t) => t.id === targetId);

  if (draggedIndex === -1 || targetIndex === -1) return tiles;

  // Check if dragged tile is pinned (cannot drag pinned tiles)
  if (tiles[draggedIndex].isPinned) return tiles;

  // Check if target tile is pinned (cannot drop on pinned tiles)
  if (tiles[targetIndex].isPinned) return tiles;

  const newTiles = [...tiles];
  const [removed] = newTiles.splice(draggedIndex, 1);
  newTiles.splice(targetIndex, 0, removed);

  saveTileConfig(category, newTiles);
  return newTiles;
}

// Toggle pin state of a tile
export function toggleTilePin(category: Category, tileId: string): TileConfig[] {
  const tiles = getTileConfig(category);
  const newTiles = tiles.map((tile) =>
    tile.id === tileId ? { ...tile, isPinned: !tile.isPinned } : tile
  );

  saveTileConfig(category, newTiles);
  return newTiles;
}

// Reset tiles to default configuration
export function resetTileConfig(category: Category): TileConfig[] {
  const tiles = DEFAULT_CONFIG[category];
  saveTileConfig(category, tiles);
  return tiles;
}
