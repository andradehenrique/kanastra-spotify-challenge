import { Trash2, Music } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import type { FavoriteSong } from '@/context/FavoritesContext.types';
import { useTranslation } from '@/hooks';

interface FavoriteCardProps {
  song: FavoriteSong;
  onRemove: (id: string) => void;
}

export function FavoriteCard({ song, onRemove }: FavoriteCardProps) {
  const { t } = useTranslation();

  const handleSpotifyClick = () => {
    if (song.spotifyTrackId) {
      window.open(`https://open.spotify.com/track/${song.spotifyTrackId}`, '_blank');
    }
  };

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      <div className="flex gap-4 p-4">
        <div className="bg-muted relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
          {song.imageUrl ? (
            <img
              src={song.imageUrl}
              alt={song.songName}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Music className="text-muted-foreground h-8 w-8" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <h3
            className="hover:text-primary cursor-pointer truncate font-semibold transition-colors"
            onClick={handleSpotifyClick}
            title={song.songName}
          >
            {song.songName}
          </h3>
          <p className="text-muted-foreground truncate text-sm" title={song.artistName}>
            {song.artistName}
          </p>
          {song.albumName && (
            <p className="text-muted-foreground truncate text-xs" title={song.albumName}>
              {song.albumName}
            </p>
          )}
          {song.notes && (
            <p
              className="text-muted-foreground mt-2 line-clamp-2 text-xs italic"
              title={song.notes}
            >
              {song.notes}
            </p>
          )}
        </div>

        <div className="flex w-16 shrink-0 flex-col items-end justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(song.id)}
            className="text-muted-foreground hover:text-destructive h-8 w-8"
            title={t('favorites.removeFromFavorites')}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <span className="text-muted-foreground text-xs whitespace-nowrap">
            {new Date(song.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Card>
  );
}
