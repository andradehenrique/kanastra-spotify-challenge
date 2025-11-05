import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { Search } from '@/components/ui/icons';

interface EmptyResultsStateProps {
  searchTerm: string;
  onClearSearch: () => void;
}

export function EmptyResultsState({ searchTerm, onClearSearch }: EmptyResultsStateProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-muted mb-4 rounded-full p-4">
        <Search className="text-muted-foreground h-12 w-12" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{t('common.noResults')}</h3>
      <p className="text-muted-foreground mb-4 max-w-md text-center text-sm">
        {t('home.noResultsFor', { term: searchTerm })}
      </p>
      <p className="text-muted-foreground mb-4 text-center text-xs">
        {t('home.tryDifferentSearch')}
      </p>
      <Button onClick={onClearSearch} variant="outline" size="sm">
        {t('home.clearSearch')}
      </Button>
    </div>
  );
}
