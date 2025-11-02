import { useTranslation } from '@/hooks';
import { Button } from '@/components/ui/button';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt-BR' ? 'en-US' : 'pt-BR';
    i18n.changeLanguage(newLang);
  };

  const currentLanguage = i18n.language === 'pt-BR' ? 'PT-BR' : 'EN-US';

  return (
    <Button onClick={toggleLanguage} variant="outline" size="sm">
      {t('header.language')}: {currentLanguage}
    </Button>
  );
}
