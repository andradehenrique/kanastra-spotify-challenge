import { useTranslation } from '@/hooks';
import { LanguageToggle } from './LanguageToggle';
import { SiSpotify } from '@icons-pack/react-simple-icons';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/95 backdrop-blur supports-backdrop-filter:bg-green/60">
      <div className="container flex h-14 items-center justify-between px-4 md:px-8 mx-auto">
        <div className="flex items-center gap-2">
          <SiSpotify className="h-5 w-5 text-white" />
          <h1 className="text-lg text-white font-semibold md:text-xl">{t('header.title')}</h1>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
