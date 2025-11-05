import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { useTranslation, useFavorites } from '@/hooks';
import { LanguageToggle } from './LanguageToggle';
import { Badge } from '@/components/ui';
import { SiSpotify } from '@icons-pack/react-simple-icons';

export function Header() {
  const { t } = useTranslation();
  const { state } = useFavorites();
  const favoritesCount = state.songs.length;

  return (
    <header className="bg-primary/95 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <SiSpotify className="h-5 w-5 text-white" />
          <h1 className="text-lg font-semibold text-white md:text-xl">{t('header.title')}</h1>
        </Link>

        <div className="flex items-center gap-3">
          {/* Favorites Link */}
          <Link
            to="/favorites"
            className="group relative flex items-center gap-2 rounded-md px-3 py-1.5 text-white transition-colors hover:bg-white/10"
          >
            <Heart className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="hidden text-sm font-medium sm:inline">
              {t('favorites.myFavorites')}
            </span>
            {favoritesCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5 text-xs">
                {favoritesCount}
              </Badge>
            )}
          </Link>

          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
