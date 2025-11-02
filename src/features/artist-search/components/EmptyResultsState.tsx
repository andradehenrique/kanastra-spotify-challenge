import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface EmptyResultsStateProps {
  searchTerm: string;
  onClearSearch: () => void;
}

export function EmptyResultsState({ searchTerm, onClearSearch }: EmptyResultsStateProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-muted mb-4 rounded-full p-4">
        <svg
          className="text-muted-foreground h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
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
