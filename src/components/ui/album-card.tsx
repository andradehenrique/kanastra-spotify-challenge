import { Card } from './card';
import { Badge } from './badge';
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
            <svg
              className="text-muted-foreground h-24 w-24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
        )}

        {/* Badge do Tipo de Álbum */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/80 text-xs backdrop-blur-sm">
            {formatAlbumType(album.album_type)}
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
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{releaseYear}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <span>
              {album.total_tracks} {album.total_tracks === 1 ? 'track' : 'tracks'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Função auxiliar para formatar tipo de álbum
function formatAlbumType(type: 'album' | 'single' | 'compilation'): string {
  const types: Record<string, string> = {
    album: 'Album',
    single: 'Single',
    compilation: 'Compilation',
  };

  return types[type] || type;
}
