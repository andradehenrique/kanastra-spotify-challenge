import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from '@/locales/en-US.json';
import ptBR from '@/locales/pt-BR.json';
import { loadFromStorage, saveToStorage } from './utils';
import { STORAGE_KEYS } from './constants';

const resources = {
  'en-US': {
    translation: enUS,
  },
  'pt-BR': {
    translation: ptBR,
  },
};

// Carregar idioma salvo do localStorage ou usar 'pt-BR' como padrão
const savedLanguage = loadFromStorage<string>(STORAGE_KEYS.LANGUAGE, 'pt-BR');

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: 'pt-BR',
  interpolation: {
    escapeValue: false,
  },
});

// Salvar idioma no localStorage sempre que mudar
i18n.on('languageChanged', (lng) => {
  saveToStorage(STORAGE_KEYS.LANGUAGE, lng);
});

export default i18n;
