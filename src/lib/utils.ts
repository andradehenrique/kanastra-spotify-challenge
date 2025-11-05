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

// ============================================================================
// UTILITIES: CLASS NAMES
// ============================================================================

/**
 * Combina classes CSS usando clsx e tailwind-merge
 * Útil para mesclar classes Tailwind CSS condicionalmente
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// UTILITIES: DEBOUNCE / TIMING
// ============================================================================

/**
 * Cria uma função debounced que atrasa a invocação da função original
 * até depois que `wait` milissegundos tenham se passado desde a última invocação
 */
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

// ============================================================================
// UTILITIES: DURATION / TIME FORMATTING
// ============================================================================

/**
 * Converte milissegundos para o formato mm:ss
 * @example formatDuration(245000) // "4:05"
 */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / MILLISECONDS_PER_SECOND);
  const minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE);
  const seconds = totalSeconds % SECONDS_PER_MINUTE;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Converte milissegundos para minutos (decimal)
 * @example msToMinutes(245000) // 4.08
 */
export function msToMinutes(ms: number): number {
  return Number((ms / MILLISECONDS_PER_MINUTE).toFixed(2));
}

// ============================================================================
// UTILITIES: DATE FORMATTING
// ============================================================================

/**
 * Formata uma data ISO string para formato localizado
 * @example formatDate("2024-01-15") // "Jan 15, 2024" (en-US) ou "15 de jan. de 2024" (pt-BR)
 */
export function formatDate(dateString: string, locale?: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// ============================================================================
// UTILITIES: TEXT FORMATTING
// ============================================================================

/**
 * Trunca um texto adicionando "..." se ultrapassar o comprimento máximo
 * @example truncateText("Long text here", 10) // "Long text ..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// ============================================================================
// UTILITIES: NUMBER FORMATTING
// ============================================================================

/**
 * Formata números grandes para notação abreviada (K, M, B)
 * @example formatNumber(1500) // "1.5K"
 * @example formatNumber(2500000) // "2.5M"
 * @example formatNumber(1500000000) // "1.5B"
 */
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

/**
 * Formata um número decimal para string com casas decimais fixas
 * @example formatDecimal(3.14159, 2) // "3.14"
 */
export function formatDecimal(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

// ============================================================================
// UTILITIES: COLOR / POPULARITY
// ============================================================================

/**
 * Retorna uma cor HSL baseada no nível de popularidade (0-100)
 * Usado para visualizações de dados e gráficos
 */
export function getPopularityColor(popularity: number): string {
  if (popularity >= POPULARITY_THRESHOLDS.VERY_HIGH) return POPULARITY_COLORS.VERY_HIGH;
  if (popularity >= POPULARITY_THRESHOLDS.HIGH) return POPULARITY_COLORS.HIGH;
  if (popularity >= POPULARITY_THRESHOLDS.MEDIUM) return POPULARITY_COLORS.MEDIUM;
  if (popularity >= POPULARITY_THRESHOLDS.LOW) return POPULARITY_COLORS.LOW;
  return POPULARITY_COLORS.VERY_LOW;
}

/**
 * Retorna um label de popularidade baseado no valor
 */
export function getPopularityLabel(popularity: number): string {
  if (popularity >= 80) return '80-100 (Muito Popular)';
  if (popularity >= 60) return '60-79 (Popular)';
  if (popularity >= 40) return '40-59 (Moderado)';
  if (popularity >= 20) return '20-39 (Baixo)';
  return '0-19 (Muito Baixo)';
}

// ============================================================================
// UTILITIES: ALBUM TYPES
// ============================================================================

/**
 * Converte o tipo de álbum do Spotify para um label traduzível
 */
export function getAlbumTypeLabel(type: string): string {
  return ALBUM_TYPE_LABELS[type] || type;
}

// ============================================================================
// UTILITIES: LOCAL STORAGE
// ============================================================================

/**
 * Carrega dados do Local Storage de forma segura
 * Retorna o valor parseado ou o valor padrão em caso de erro
 */
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

/**
 * Salva dados no Local Storage de forma segura
 */
export function saveToStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Erro ao salvar "${key}" no Local Storage:`, error);
    return false;
  }
}

/**
 * Remove um item do Local Storage de forma segura
 */
export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Erro ao remover "${key}" do Local Storage:`, error);
    return false;
  }
}

// ============================================================================
// UTILITIES: ID GENERATION
// ============================================================================

/**
 * Gera um ID único baseado em timestamp + string aleatória
 * Formato: timestamp-randomString
 */
export function generateUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
