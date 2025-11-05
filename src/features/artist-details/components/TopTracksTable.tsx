import { useState, useRef } from 'react';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  Button,
} from '@/components/ui';
import { formatDuration } from '@/lib/utils';
import type { SpotifyTrack } from '@/@types/spotify';
import { useTranslation, useFavorites } from '@/hooks';

interface TopTracksTableProps {
  tracks: SpotifyTrack[];
  itemsPerPage?: number;
}

export function TopTracksTable({ tracks, itemsPerPage = 10 }: TopTracksTableProps) {
  const { t } = useTranslation();
  const { addSong, removeSong, isFavorite, getFavoriteByTrackId } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(tracks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTracks = tracks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    tableRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRowClick = (trackUrl: string) => {
    window.open(trackUrl, '_blank', 'noopener,noreferrer');
  };

  const handleToggleFavorite = (e: React.MouseEvent, track: SpotifyTrack) => {
    e.stopPropagation();

    const isCurrentlyFavorite = isFavorite(track.id);

    if (isCurrentlyFavorite) {
      const favorite = getFavoriteByTrackId(track.id);
      if (favorite) {
        removeSong(favorite.id);
        toast.success(t('favorites.removed'));
      }
    } else {
      addSong({
        songName: track.name,
        artistName: track.artists.map((a) => a.name).join(', '),
        albumName: track.album.name,
        spotifyTrackId: track.id,
        spotifyArtistId: track.artists[0]?.id,
        imageUrl: track.album.images[0]?.url,
      });
      toast.success(t('favorites.added'));
    }
  };

  return (
    <div ref={tableRef} className="space-y-4">
      {/* Header da seção */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('artist.topTracks')}</h2>
        <span className="text-muted-foreground text-sm">
          {tracks.length} {tracks.length === 1 ? t('tracks.title').slice(0, -1) : t('tracks.title')}
        </span>
      </div>

      {/* Tabela */}
      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>{t('tracks.name')}</TableHead>
              <TableHead>{t('tracks.album')}</TableHead>
              <TableHead className="text-center">{t('tracks.duration')}</TableHead>
              <TableHead className="text-center">{t('tracks.popularity')}</TableHead>
              <TableHead className="w-12 text-center">❤️</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTracks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <span className="text-muted-foreground">{t('common.noResults')}</span>
                </TableCell>
              </TableRow>
            ) : (
              currentTracks.map((track, index) => (
                <TableRow
                  key={track.id}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(track.external_urls.spotify)}
                >
                  <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {track.album.images[0]?.url && (
                        <img
                          src={track.album.images[0].url}
                          alt={track.name}
                          className="h-10 w-10 rounded object-cover"
                          loading="lazy"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{track.name}</p>
                        <p className="text-muted-foreground truncate text-sm">
                          {track.artists.map((a) => a.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground text-sm">{track.album.name}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-muted-foreground text-sm">
                      {formatDuration(track.duration_ms)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="bg-muted h-1.5 w-16 overflow-hidden rounded-full">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${track.popularity}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground text-xs font-medium">
                        {track.popularity}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleToggleFavorite(e, track)}
                      className="h-8 w-8 transition-transform hover:scale-110"
                      title={
                        isFavorite(track.id)
                          ? t('favorites.removeFromFavorites')
                          : t('favorites.addToFavorites')
                      }
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isFavorite(track.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
