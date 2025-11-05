import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAlbumTypeLabel } from '@/lib/utils';
import { Calendar, Music, Album } from '@/components/ui/icons';
import type { SpotifyAlbumSimplified } from '@/@types/spotify';

interface AlbumCardProps {
  album: SpotifyAlbumSimplified;
  onClick?: () => void;
}

export function AlbumCard({ album, onClick }: AlbumCardProps) {
  const imageUrl = album.images[0]?.url;
  const artists = album.artists.map((artist) => artist.name).join(', ');
  const releaseYear = new Date(album.release_date).getFullYear();

  return (
    <Card
      className="group h-full cursor-pointer overflow-hidden pt-0 transition-all hover:scale-[1.02] hover:shadow-lg"
      onClick={onClick}
    >
      {/* Imagem do Álbum */}
      <div className="bg-muted relative aspect-square w-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={album.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Album className="text-muted-foreground h-24 w-24" />
          </div>
        )}

        {/* Badge do Tipo de Álbum */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/80 text-xs backdrop-blur-sm">
            {getAlbumTypeLabel(album.album_type)}
          </Badge>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="space-y-3 px-4">
        {/* Nome do Álbum */}
        <h3 className="group-hover:text-primary line-clamp-1 text-lg font-semibold transition-colors">
          {album.name}
        </h3>

        {/* Artistas */}
        <p className="text-muted-foreground line-clamp-1 text-sm">{artists}</p>

        {/* Release Year e Total de Tracks */}
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{releaseYear}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Music className="h-3.5 w-3.5" />
            <span>
              {album.total_tracks} {album.total_tracks === 1 ? 'track' : 'tracks'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
