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

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR', // idioma padrão
    fallbackLng: 'pt-BR',
    interpolation: {
      escapeValue: false, // React já faz o escape
    },
  });

export default i18n;
