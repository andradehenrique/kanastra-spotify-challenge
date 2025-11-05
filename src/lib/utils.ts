import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  POPULARITY_COLORS,
  POPULARITY_THRESHOLDS,
  ALBUM_TYPE_LABELS,
  MILLISECONDS_PER_SECOND,
  MILLISECONDS_PER_MINUTE,
  SECONDS_PER_MINUTE,
} from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / MILLISECONDS_PER_SECOND);
  const minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE);
  const seconds = totalSeconds % SECONDS_PER_MINUTE;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function msToMinutes(ms: number): number {
  return Number((ms / MILLISECONDS_PER_MINUTE).toFixed(2));
}

export function formatDate(dateString: string, locale?: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function formatNumber(count: number): string {
  if (count >= 1_000_000_000) {
    return `${(count / 1_000_000_000).toFixed(1)}B`;
  }
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toString();
}

export function formatDecimal(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function getPopularityColor(popularity: number): string {
  if (popularity >= POPULARITY_THRESHOLDS.VERY_HIGH) return POPULARITY_COLORS.VERY_HIGH;
  if (popularity >= POPULARITY_THRESHOLDS.HIGH) return POPULARITY_COLORS.HIGH;
  if (popularity >= POPULARITY_THRESHOLDS.MEDIUM) return POPULARITY_COLORS.MEDIUM;
  if (popularity >= POPULARITY_THRESHOLDS.LOW) return POPULARITY_COLORS.LOW;
  return POPULARITY_COLORS.VERY_LOW;
}

export function getPopularityLabel(popularity: number): string {
  if (popularity >= 80) return '80-100 (Muito Popular)';
  if (popularity >= 60) return '60-79 (Popular)';
  if (popularity >= 40) return '40-59 (Moderado)';
  if (popularity >= 20) return '20-39 (Baixo)';
  return '0-19 (Muito Baixo)';
}

export function getAlbumTypeLabel(type: string): string {
  return ALBUM_TYPE_LABELS[type] || type;
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored) as T;
    }
  } catch (error) {
    console.error(`Erro ao carregar "${key}" do Local Storage:`, error);
  }
  return defaultValue;
}

export function saveToStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Erro ao salvar "${key}" no Local Storage:`, error);
    return false;
  }
}

export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Erro ao remover "${key}" do Local Storage:`, error);
    return false;
  }
}

export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
