/**
 * Tipos globais para i18next
 * 
 * Isso fornece autocomplete e type-safety para as traduções
 */
import 'i18next';
import type ptBR from '@/locales/pt-BR.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof ptBR;
    };
  }
}
