import { describe, it, expect, afterEach } from 'vitest';
import {
  formatDuration,
  formatNumber,
  truncateText,
  getPopularityLabelKey,
  msToMinutes,
  formatDate,
  formatDecimal,
  getPopularityColor,
  getAlbumTypeLabel,
  loadFromStorage,
  saveToStorage,
  removeFromStorage,
  generateUniqueId,
  debounce,
  cn,
} from '@/lib/utils';

describe('formatDuration', () => {
  it('formata milissegundos para mm:ss', () => {
    expect(formatDuration(0)).toBe('0:00');
    expect(formatDuration(61000)).toBe('1:01');
    expect(formatDuration(125000)).toBe('2:05');
  });
});

describe('formatNumber', () => {
  it('formata números grandes com sufixos', () => {
    expect(formatNumber(999)).toBe('999');
    expect(formatNumber(1500)).toBe('1.5K');
    expect(formatNumber(2_000_000)).toBe('2.0M');
    expect(formatNumber(3_000_000_000)).toBe('3.0B');
  });
});

describe('truncateText', () => {
  it('trunca texto corretamente', () => {
    expect(truncateText('abc', 5)).toBe('abc');
    expect(truncateText('abcdef', 3)).toBe('abc...');
  });
});

describe('getPopularityLabelKey', () => {
  it('retorna a chave correta para cada faixa de popularidade', () => {
    expect(getPopularityLabelKey(85)).toBe('charts.popularityRange.veryHigh');
    expect(getPopularityLabelKey(65)).toBe('charts.popularityRange.high');
    expect(getPopularityLabelKey(45)).toBe('charts.popularityRange.medium');
    expect(getPopularityLabelKey(25)).toBe('charts.popularityRange.low');
    expect(getPopularityLabelKey(10)).toBe('charts.popularityRange.veryLow');
  });
});

describe('msToMinutes', () => {
  it('converte milissegundos para minutos com 2 casas decimais', () => {
    expect(msToMinutes(60000)).toBe(1);
    expect(msToMinutes(90000)).toBe(1.5);
    expect(msToMinutes(0)).toBe(0);
  });
});

describe('formatDate', () => {
  it('formata datas corretamente', () => {
    const date = new Date('2023-01-01T00:00:00Z');
    const pt = formatDate(date.toISOString(), 'pt-BR');
    const en = formatDate(date.toISOString(), 'en-US');
    // Deve conter o ano correto
    expect(pt).toMatch(/2022|2023/);
    expect(en).toMatch(/2022|2023/);
    // Deve conter dia e mês abreviado
    expect(pt).toMatch(/\d{1,2}/);
    expect(en).toMatch(/\d{1,2}/);
  });
});

describe('formatDecimal', () => {
  it('formata números decimais', () => {
    expect(formatDecimal(1.23456)).toBe('1.23');
    expect(formatDecimal(1.2, 3)).toBe('1.200');
  });
});

describe('getPopularityColor', () => {
  it('retorna a cor correta para cada faixa', () => {
    expect(getPopularityColor(85)).toBe('hsl(142, 76%, 36%)');
    expect(getPopularityColor(65)).toBe('hsl(221, 83%, 53%)');
    expect(getPopularityColor(45)).toBe('hsl(262, 83%, 58%)');
    expect(getPopularityColor(25)).toBe('hsl(25, 95%, 53%)');
    expect(getPopularityColor(10)).toBe('hsl(0, 84%, 60%)');
  });
});

describe('getAlbumTypeLabel', () => {
  it('retorna o label correto para tipos conhecidos', () => {
    expect(getAlbumTypeLabel('album')).toBe('Álbum');
    expect(getAlbumTypeLabel('single')).toBe('Single');
    expect(getAlbumTypeLabel('compilation')).toBe('Compilação');
  });
  it('retorna o próprio tipo para desconhecidos', () => {
    expect(getAlbumTypeLabel('foo')).toBe('foo');
  });
});

describe('Storage utils', () => {
  const key = 'test-key';
  afterEach(() => {
    localStorage.clear();
  });
  it('saveToStorage e loadFromStorage', () => {
    expect(saveToStorage(key, { a: 1 })).toBe(true);
    expect(loadFromStorage(key, null)).toEqual({ a: 1 });
  });
  it('loadFromStorage retorna defaultValue se não existir', () => {
    expect(loadFromStorage('not-exist', 42)).toBe(42);
  });
  it('removeFromStorage remove o item', () => {
    saveToStorage(key, 123);
    expect(removeFromStorage(key)).toBe(true);
    expect(loadFromStorage(key, 'x')).toBe('x');
  });
});

describe('generateUniqueId', () => {
  it('gera ids únicos', () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();
    expect(id1).not.toBe(id2);
    expect(typeof id1).toBe('string');
  });
});

describe('debounce', () => {
  it('executa a função apenas após o tempo', async () => {
    let count = 0;
    const fn = debounce(() => {
      count++;
    }, 50);
    fn();
    fn();
    expect(count).toBe(0);
    await new Promise((r) => setTimeout(r, 60));
    expect(count).toBe(1);
  });
});

describe('cn', () => {
  it('combina classes corretamente', () => {
    expect(cn('a', 'b')).toBe('a b');
    expect(cn('a', undefined, 'c')).toBe('a c');
  });
});
