import { Link } from '@tanstack/react-router';
import { useTranslation } from '@/hooks';
import { LanguageToggle } from './LanguageToggle';
import { SiSpotify } from '@icons-pack/react-simple-icons';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-primary/95 supports-backdrop-filter:bg-green/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <SiSpotify className="h-5 w-5 text-white" />
          <h1 className="text-lg font-semibold text-white md:text-xl">{t('header.title')}</h1>
        </Link>

        <div className="flex items-center gap-2">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
