import { Card } from './card';
import { Badge } from './badge';
import type { SpotifyArtist } from '@/@types/spotify';

interface ArtistCardProps {
  artist: SpotifyArtist;
  onClick?: () => void;
}

export function ArtistCard({ artist, onClick }: ArtistCardProps) {
  const imageUrl = artist.images[0]?.url;
  const genres = artist.genres.slice(0, 3);

  return (
    <Card
      className="group h-full cursor-pointer overflow-hidden pt-0 transition-all hover:scale-[1.02] hover:shadow-lg"
      onClick={onClick}
    >
      {/* Imagem do Artista */}
      <div className="bg-muted relative aspect-square w-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artist.name}
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="space-y-3 px-4">
        {/* Nome do Artista */}
        <h3 className="group-hover:text-primary line-clamp-1 text-lg font-semibold transition-colors">
          {artist.name}
        </h3>

        {/* Gêneros */}
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {genres.map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        )}

        {/* Popularidade e Seguidores */}
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          {/* Barra de Popularidade */}
          <div className="flex flex-1 items-center gap-2">
            <span className="text-xs">Popularity</span>
            <div className="bg-muted h-1.5 max-w-20 flex-1 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-all"
                style={{ width: `${artist.popularity}%` }}
              />
            </div>
            <span className="text-xs font-medium">{artist.popularity}</span>
          </div>
        </div>

        {/* Seguidores */}
        {artist.followers?.total !== undefined && (
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>{formatFollowers(artist.followers.total)}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

// Função auxiliar para formatar número de seguidores
function formatFollowers(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toString();
}
