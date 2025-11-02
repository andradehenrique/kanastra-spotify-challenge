import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { useTranslation } from '@/hooks/useTranslation';

interface ItemsGridProps<T> {
  items: T[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onClearSearch: () => void;
  renderItem: (item: T, index: number) => ReactNode;
  getItemKey: (item: T) => string;
}

export function ItemsGrid<T>({
  items,
  searchTerm,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onClearSearch,
  renderItem,
  getItemKey,
}: ItemsGridProps<T>) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t('home.resultsFor', { term: searchTerm })}</h2>
        <Button onClick={onClearSearch} variant="ghost" size="sm">
          {t('home.clearSearch')}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, index) => (
          <div key={getItemKey(item)}>{renderItem(item, index)}</div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
