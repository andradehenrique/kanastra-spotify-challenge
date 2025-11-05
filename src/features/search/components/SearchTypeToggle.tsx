import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { User, Album } from '@/components/ui/icons';

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
        <User className="h-4 w-4" />
        {t('home.artists')}
      </Button>
      <Button
        variant={searchType === 'album' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSearchTypeChange('album')}
        className="gap-2"
      >
        <Album className="h-4 w-4" />
        {t('home.albums')}
      </Button>
    </div>
  );
}
