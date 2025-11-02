import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

type SearchType = 'artist' | 'album';

interface SearchTypeToggleProps {
  searchType: SearchType;
  onSearchTypeChange: (type: SearchType) => void;
  show: boolean;
}

export function SearchTypeToggle({ searchType, onSearchTypeChange, show }: SearchTypeToggleProps) {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant={searchType === 'artist' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSearchTypeChange('artist')}
        className="gap-2"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        {t('home.artists')}
      </Button>
      <Button
        variant={searchType === 'album' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSearchTypeChange('album')}
        className="gap-2"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
        {t('home.albums')}
      </Button>
    </div>
  );
}
