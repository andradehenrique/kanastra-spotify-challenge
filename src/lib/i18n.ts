import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from '@/locales/en-US.json';
import ptBR from '@/locales/pt-BR.json';

const resources = {
  'en-US': {
    translation: enUS,
  },
  'pt-BR': {
    translation: ptBR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
