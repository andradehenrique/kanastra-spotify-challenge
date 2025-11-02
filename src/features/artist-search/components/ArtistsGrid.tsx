import { Button } from '@/components/ui/button';
import { ArtistCard } from '@/components/ui/artist-card';
import { Pagination } from '@/components/ui/pagination';
import { useTranslation } from '@/hooks/useTranslation';
import type { SpotifyArtist } from '@/@types/spotify';

interface ArtistsGridProps {
  artists: SpotifyArtist[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onClearSearch: () => void;
  onArtistClick: (artistId: string) => void;
}

export function ArtistsGrid({
  artists,
  searchTerm,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onClearSearch,
  onArtistClick,
}: ArtistsGridProps) {
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
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} onClick={() => onArtistClick(artist.id)} />
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
