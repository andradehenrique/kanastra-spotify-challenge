import { useState } from 'react';
import { toast } from 'sonner';
import { Trash2, Plus, X } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { useFavorites, useTranslation } from '@/hooks';
import { FavoriteCard, EmptyFavoritesState, AddManualForm } from './components';

export function FavoritesContainer() {
  const { t } = useTranslation();
  const { state, removeSong, clearAll } = useFavorites();
  const [showForm, setShowForm] = useState(false);

  const handleRemoveSong = (id: string) => {
    removeSong(id);
    toast.success(t('favorites.removed'));
  };

  const handleClearAll = () => {
    if (window.confirm(t('favorites.clearAllConfirm'))) {
      clearAll();
      toast.success(t('favorites.allRemoved'));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{t('favorites.myFavorites')}</h1>
          <Badge variant="secondary" className="text-base">
            {state.songs.length}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
            {showForm ? (
              <>
                <X className="h-4 w-4" />
                {t('common.close')}
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                {t('favorites.addFavorite')}
              </>
            )}
          </Button>

          {state.songs.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleClearAll}>
              <Trash2 className="h-4 w-4" />
              {t('favorites.clearAll')}
            </Button>
          )}
        </div>
      </div>

      {/* Add Manual Form (conditional) */}
      {showForm && (
        <div className="animate-in fade-in-50 duration-200">
          <AddManualForm />
        </div>
      )}

      {/* Favorites List */}
      {state.songs.length === 0 ? (
        <EmptyFavoritesState />
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {state.songs.map((song) => (
            <FavoriteCard key={song.id} song={song} onRemove={handleRemoveSong} />
          ))}
        </div>
      )}
    </div>
  );
}
