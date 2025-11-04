import { Music } from 'lucide-react';
import { useTranslation } from '@/hooks';

export function EmptyFavoritesState() {
  const { t } = useTranslation();

  return (
    <div className="bg-card flex flex-col items-center justify-center rounded-lg border p-12 text-center">
      <div className="bg-muted mb-4 rounded-full p-6">
        <Music className="text-muted-foreground h-12 w-12" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{t('favorites.noFavorites')}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{t('favorites.emptyState')}</p>
    </div>
  );
}
