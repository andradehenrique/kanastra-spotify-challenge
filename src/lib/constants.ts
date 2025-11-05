export const SPOTIFY_ITEMS_PER_PAGE = 20;
export const DEFAULT_ITEMS_PER_PAGE = 10;

export const POPULARITY_COLORS = {
  VERY_HIGH: 'hsl(142, 76%, 36%)', // Verde (80-100)
  HIGH: 'hsl(221, 83%, 53%)', // Azul (60-79)
  MEDIUM: 'hsl(262, 83%, 58%)', // Roxo (40-59)
  LOW: 'hsl(25, 95%, 53%)', // Laranja (20-39)
  VERY_LOW: 'hsl(0, 84%, 60%)', // Vermelho (0-19)
} as const;

export const POPULARITY_THRESHOLDS = {
  VERY_HIGH: 80,
  HIGH: 60,
  MEDIUM: 40,
  LOW: 20,
} as const;

export const ALBUM_TYPE_LABELS: Record<string, string> = {
  album: 'Álbum',
  single: 'Single',
  compilation: 'Compilação',
} as const;

export const STORAGE_KEYS = {
  FAVORITES: 'spotify-favorites',
  LANGUAGE: 'spotify-language',
  THEME: 'spotify-theme',
} as const;

export const MILLISECONDS_PER_SECOND = 1000;
export const MILLISECONDS_PER_MINUTE = 60000;
export const SECONDS_PER_MINUTE = 60;
